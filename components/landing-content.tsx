"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Bhartenu Vimal Joshi",
    avatar: "bhanu.jpeg",
    title: "CEO",
    description:
      "We are regularly using image to code converter at Zerovik and I am extremely happy with the outputs!",
  },
  {
    name: "Tshiteej Bhardwaj",
    avatar: "tshiteej.jpeg",
    title: "Senior Backend Developer",
    description:
      "I rely on image-to-code converter daily to generate code, and I absolutely adore the product!",
  },
  {
    name: "Sangam Kumar",
    avatar: "sangam.jpeg",
    title: "Senior Software Engineer",
    description:
      "This app has changed my life, Now I can code even faster in less time. I have more bandwidth than ever. Thanks Mukesh!",
  },
]

const companies = []

export const LandingContent = () => {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
              Input Image
            </h2>
            <Image
              src="/output.png"
              alt="product preview"
              width={1364}
              height={866}
              quality={100}
              className="rounded-md bg-white p-1 sm:p-4 md:p-10 shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
              Output Code
            </h2>
            <Image
              src="/input.png"
              alt="product preview"
              width={1364}
              height={866}
              quality={100}
              className="rounded-md bg-white p-1 sm:p-4 md:p-10 shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
      <div className="px-10 pb-20 py-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <Card
              key={item.description}
              className="bg-[#192339] border-none text-white"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <Avatar>
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title}</p>
                  </div>
                </CardTitle>
                <CardContent className="pt-4 px-0">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
