"use client"

import { motion, useReducedMotion } from "motion/react"

import { heroMotion } from "../model/hero-motion"

const introEase = [0.16, 1, 0.3, 1] as const
const textExitEase = [0.2, 0, 0, 1] as const

function IntroOverlay() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#E5DFFB_0%,#E9E2FE_25%,#F0E8FE_55%,#FBD2F7_100%)]"
      initial={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
      animate={
        shouldReduceMotion
          ? { opacity: 0, y: "0%", filter: "blur(0px)" }
          : { opacity: 1, y: "-102%", filter: "blur(10px)" }
      }
      transition={
        shouldReduceMotion
          ? { delay: 0.42, duration: 0.18, ease: "linear" }
          : {
              delay: heroMotion.intro.overlayExitDelay,
              duration: heroMotion.intro.overlayExitDuration,
              ease: introEase,
            }
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_44%,rgba(255,255,255,0.44),transparent_34%),radial-gradient(circle_at_77%_19%,rgba(251,210,247,0.72),transparent_34%),radial-gradient(circle_at_58%_92%,rgba(224,210,251,0.56),transparent_40%)]"
      />
      <motion.p
        className="relative bg-[linear-gradient(90deg,#7252D8_0%,#8C55DC_34%,#B65AD0_68%,#D36AC8_100%)] bg-clip-text px-6 text-center font-heading text-[3.4rem] font-semibold uppercase leading-none text-transparent sm:text-[5.2rem] lg:text-[7rem]"
        initial={{ opacity: 0, scale: 0.992, filter: "blur(8px)" }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : {
                opacity: [0, 0.98, 1, 0],
                scale: [0.992, 1, 1.012, 1.08],
                filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(18px)"],
                y: ["0rem", "0rem", "-0.08rem", "-1.15rem"],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.12, ease: "linear" }
            : {
                duration: 1.68,
                ease: textExitEase,
                times: [0, 0.22, 0.7, 1],
              }
        }
      >
        WHY ME?
      </motion.p>
    </motion.div>
  )
}

export { IntroOverlay }
