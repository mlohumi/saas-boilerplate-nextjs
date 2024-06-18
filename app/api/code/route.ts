import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
})

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "you are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. Provide html and css code for the input provided.",
}

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

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [instructionMessage, ...messages],
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log("[CODE_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
