import {
  HTML_TAILWIND_PROMPT,
  REACT_TAILWIND_PROMPT,
  BOOTSTRAP_PROMPT,
  VUE_TAILWIND_PROMPT,
  ICONIC_TAILWIND_PROMPT,
  SVG_PROMPT,
} from "@/constants"

import * as z from "zod"

export const formSchema = z.object({
  image: z.instanceof(File), // Define the schema for the image field
})

export const techOption = [
  {
    value: HTML_TAILWIND_PROMPT,
    label: "HTML-Tailwind",
  },
  {
    value: REACT_TAILWIND_PROMPT,
    label: "React-Tailwind",
  },
  {
    value: BOOTSTRAP_PROMPT,
    label: "Bootstrap",
  },
  {
    value: VUE_TAILWIND_PROMPT,
    label: "Vue-Tailwind",
  },
  {
    value: ICONIC_TAILWIND_PROMPT,
    label: "Iconic-Tailwind",
  },
  {
    value: SVG_PROMPT,
    label: "SVG",
  },
]

export const prePrompt = [
  {
    value: "HTML/Tailwind",
    label: "HTML-Tailwind",
  },
  {
    value: "React/Tailwind",
    label: "React-Tailwind",
  },
  {
    value: "Bootstrap",
    label: "Bootstrap",
  },
  {
    value: "Vue/Tailwind",
    label: "Vue-Tailwind",
  },
  {
    value: "Iconic/Tailwind",
    label: "Iconic-Tailwind",
  },
  {
    value: "SVG",
    label: "SVG",
  },
]
