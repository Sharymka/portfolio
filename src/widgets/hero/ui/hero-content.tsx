"use client"

import { motion, useReducedMotion } from "motion/react"

import { heroContent } from "../model/hero-content"

const revealEase = [0.16, 1, 0.3, 1] as const

type HeroContentProps = {
  revealDelay?: number
}

function HighlightedHeadline() {
  return (
    <>
      {heroContent.headline.lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      {heroContent.headline.accentLines.map((line) => (
        <span
          key={line}
          className="block bg-[linear-gradient(90deg,#7252D8_0%,#8C55DC_38%,#B65AD0_72%,#D36AC8_100%)] bg-clip-text text-transparent"
        >
          {line}
        </span>
      ))}
    </>
  )
}

function HeroContent({ revealDelay = 0 }: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion()
  const itemInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
  const itemAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const transition = shouldReduceMotion
    ? { duration: 0.18, ease: "linear" as const }
    : { duration: 0.72, ease: revealEase }

  return (
    <motion.div
      className="flex w-full max-w-[42rem] flex-col gap-8 text-left"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0.03 : 0.14,
            delayChildren: shouldReduceMotion ? 0 : revealDelay + 0.08,
          },
        },
      }}
    >
      <div className="flex flex-col gap-6">
        <motion.p
          className="font-mono text-[0.95rem] font-medium uppercase text-[#916FE1]"
          variants={{ hidden: itemInitial, visible: itemAnimate }}
          transition={transition}
        >
          {heroContent.role}
        </motion.p>
        <motion.h1
          id="hero-heading"
          className="max-w-[42rem] text-balance font-heading text-[3.35rem] font-semibold leading-[0.99] text-[#181D36] sm:text-[4.25rem] lg:text-[4.2rem] xl:text-[4.5rem]"
          variants={{ hidden: itemInitial, visible: itemAnimate }}
          transition={transition}
        >
          <HighlightedHeadline />
        </motion.h1>
      </div>

      <motion.p
        className="max-w-[41rem] text-pretty text-lg leading-8 text-[#3E3C59] lg:text-xl lg:leading-9"
        variants={{ hidden: itemInitial, visible: itemAnimate }}
        transition={transition}
      >
        {heroContent.subtitle}
      </motion.p>

      <motion.p
        className="max-w-[32rem] whitespace-pre-line font-mono text-[0.95rem] font-medium leading-8 text-[#8C68B4]"
        variants={{ hidden: itemInitial, visible: itemAnimate }}
        transition={transition}
      >
        {`${heroContent.stack.slice(0, 4).join("  •  ")}\n${heroContent.stack.slice(4).join("  •  ")}`}
      </motion.p>
    </motion.div>
  )
}

export { HeroContent }
