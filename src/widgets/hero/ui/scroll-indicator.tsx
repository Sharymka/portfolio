"use client"

import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { heroContent } from "../model/hero-content"

const revealEase = [0.16, 1, 0.3, 1] as const

type ScrollIndicatorProps = {
  revealDelay?: number
}

function ScrollIndicator({ revealDelay = 0 }: ScrollIndicatorProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.18, delay: 0.12, ease: "linear" }
          : { duration: 0.64, delay: revealDelay + 0.72, ease: revealEase }
      }
    >
      <Link
        href={heroContent.scrollIndicator.href}
        className="group inline-flex w-fit flex-col items-center gap-3 font-mono text-sm font-medium uppercase text-[#8B55DE] transition-colors hover:text-[#7B54D9] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#8B55DE]/25"
        aria-label={heroContent.scrollIndicator.label}
      >
        <span>Scroll</span>
        <span
          aria-hidden="true"
          className="flex flex-col items-center text-[#8B55DE] transition-transform group-hover:translate-y-0.5"
        >
          <span className="h-10 w-px bg-current" />
          <ArrowDown className="-mt-1 size-5" />
        </span>
      </Link>
    </motion.div>
  )
}

export { ScrollIndicator }
