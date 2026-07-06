"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

import { heroContent } from "../model/hero-content"

const imageEase = [0.16, 1, 0.3, 1] as const

type HeroImageProps = {
  revealDelay?: number
}

function HeroImage({ revealDelay = 0 }: HeroImageProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[24rem] lg:mx-0 lg:max-w-[29rem]"
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.96, x: 24 }
      }
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.18, ease: "linear" }
          : { duration: 0.88, delay: revealDelay + 0.24, ease: imageEase }
      }
    >
      <div className="absolute -inset-4 rounded-[2.7rem] border border-white/70 bg-[#F8E8FC]/45 shadow-[0_30px_95px_rgba(248,208,240,0.36)]" />
      <div className="absolute -inset-12 -z-10 rounded-[4rem] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.68),rgba(248,208,240,0.36)_45%,transparent_68%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-[#F4ECFC]/58 shadow-[0_18px_54px_rgba(160,120,205,0.08)] backdrop-blur">
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          width={960}
          height={1200}
          priority
          className="aspect-[4/5] h-auto w-full object-cover"
        />
      </div>
    </motion.div>
  )
}

export { HeroImage }
