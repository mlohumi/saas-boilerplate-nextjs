"use client"

import Select from "react-select"
import axios from "axios"
import { Loader } from "@/components/loader"
import { useState } from "react"

import { Heading } from "@/components/heading"

import { useProModal } from "@/hooks/use-pro-modal"
import { useRouter } from "next/navigation"
import {
  ChatCompletionContentPartImage,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs"

import { techOption } from "./constants"

import toast from "react-hot-toast"
import { BrainCircuit } from "lucide-react"
import { Empty } from "@/components/empty"
import ReactMarkdown from "react-markdown"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { cn } from "@/lib/utils"
import { any, string } from "zod"
import { log } from "console"

const ImageToCodePage = () => {
  const proModal = useProModal()
  const router = useRouter()

  const [messages, setMessages] = useState<any>([])

  const [image, setImage] = useState<File | null>(null)
  const [base64Image, setBase64Image] = useState<string>("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedOption, setSelectedOption] = useState<string>("")

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const selectedImage = e.target.files[0]
  //     setImage(selectedImage)

  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       if (typeof reader.result === "string") {
  //         setBase64Image(reader.result)
  //       }
  //     }
  //     reader.readAsDataURL(selectedImage)
  //   }
  // }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0]
      setImage(selectedImage)

      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          const base64String = Buffer.from(reader.result).toString("base64")
          setBase64Image(base64String)
        }
      }
      reader.readAsArrayBuffer(selectedImage)
    }
  }

  const handleGenerate = async () => {
    if (base64Image) {
      setLoading(true)
    }
    try {
      // const imageURL: ChatCompletionContentPartImage.ImageURL = {
      //   url: base64Image,
      // }
      // const imgContent: ChatCompletionContentPartImage = {
      //   type: "image_url",
      //   image_url: { url: base64Image, detail: "high" },
      // }

      // const imageContent: ChatCompletionContentPartImage = {
      //   type: "image_url",
      //   image_url: { url: base64Image },
      // }

      // let userMessage: ChatCompletionMessageParam = {
      //   role: "user",
      //   content: [imageContent],
      // }

      let userMessage = {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: base64Image,
            },
          },
          {
            type: "text",
            text: selectedOption,
          },
        ],
      }

      const newMessages = [userMessage]

      const response = await axios.post("/api/image-to-code", {
        messages: newMessages,
      })

      if (userMessage.content[0]?.source?.data) {
        userMessage.content[0].source.data =
          "data:image/png;base64," + userMessage.content[0].source?.data
      }

      setMessages((current: any) => [...current, userMessage, response.data])
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code for an image"
        icon={BrainCircuit}
        iconColor="text-emerald-700"
        bgColor="bg-emerald-700/10"
      />
      {/* <div className="container mx-auto mt-10"> */}
      <div className="px-4 lg:px-8">
        <div className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-6">
            <div className="m-0 p-0">
              <input
                type="file"
                onChange={handleImageChange}
                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            {/* TODO : to change this select component ui to shadecn/ui*/}
            <Select
              options={techOption.map((option) => option)}
              placeholder="Select Tech Option"
              isClearable={true}
              onChange={(selectedOptions) =>
                setSelectedOption(
                  selectedOptions?.value ? (selectedOptions as any).value : null
                )
              }
              styles={{
                control: (provided: any) => ({
                  ...provided,
                  borderColor: "lightgray",
                }),
                option: (provided: any, state: { isSelected: any }) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#007bff" : "white",
                  color: state.isSelected ? "white" : "black",
                }),
              }}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 col-span-12 lg:col-span-2 w-full"
            onClick={handleGenerate}
            disabled={!base64Image || !selectedOption}
          >
            Generate
          </button>
        </div>
      </div>
      <div className="space-y-4 mt-4">
        {loading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !loading && (
          <Empty label="No conversation started" />
        )}

        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message: any) => (
            <div
              key={
                typeof message.content === "string"
                  ? message.content
                  : "Unsupported message format"
              }
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" &&
              message.content.length > 0 &&
              typeof message.content[0] === "object" &&
              "image" in message.content[0] ? (
                <UserAvatar />
              ) : (
                <BotAvatar />
              )}
              <div>
                {message.role === "user" &&
                typeof message.content !== "string" &&
                message.content[0].type === "image" ? (
                  <img src={message.content[0].source.data} />
                ) : (
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <img
                          {...props}
                          className="w-20 h-auto rounded-lg sm:w-32 md:w-48 lg:w-64 max-w-full"
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {(typeof message.content === "string" && message.content) ||
                      "Unsupported message format"}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageToCodePage
