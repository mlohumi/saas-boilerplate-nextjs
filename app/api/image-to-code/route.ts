import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
})

import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 })
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 })

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 3000,
      messages: messages,
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    let res = {
      role: "assistant",
      content: response.content[0].text,
    }

    return NextResponse.json(res)
  } catch (error) {
    console.log("[CODE_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
