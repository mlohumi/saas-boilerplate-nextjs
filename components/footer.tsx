"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export const LandingFooter = () => {
  return (
    <div>
      <Separator className="my-4" />
      <div className="text-white py-6">
        <div className="container mx-auto flex flex-col items-center">
          <p className="mb-2">
            {" "}
            <a
              href="https://www.linkedin.com/in/mukesh-lohumi/"
              className="hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Made with ❤️ by Mukesh
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
