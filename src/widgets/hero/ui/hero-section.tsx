import { Container } from "@/shared/ui/container"
import { Section } from "@/shared/ui/section"
import { HeroContent } from "./hero-content"
import { HeroImage } from "./hero-image"
import { ScrollIndicator } from "./scroll-indicator"

function HeroSection() {
  return (
    <Section
      spacing="loose"
      className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(135deg,#E5DFFB_0%,#E9E2FE_25%,#F0E8FE_55%,#FBD2F7_100%)] py-10 sm:py-12 lg:py-14"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_44%,rgba(255,255,255,0.44),transparent_34%),radial-gradient(circle_at_77%_19%,rgba(251,210,247,0.72),transparent_34%),radial-gradient(circle_at_58%_92%,rgba(224,210,251,0.56),transparent_40%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-white/55"
      />
      <Container
        size="wide"
        className="relative flex min-h-[calc(100vh-7rem)] flex-col"
      >
        <div className="mb-16 flex items-center justify-between gap-4 text-sm text-[#3E3C59] lg:mb-24">
          <span className="font-medium text-[#3C3C58]">Svetlana Portfolio</span>
          <span className="hidden font-mono text-[0.95rem] font-medium uppercase text-[#8C5CA0] sm:inline">
            Frontend / Product UI
          </span>
        </div>

        <div className="grid flex-1 items-center gap-14 lg:grid-cols-[minmax(0,42rem)_minmax(24rem,29rem)] lg:justify-between lg:gap-16">
          <div className="flex flex-col">
            <HeroContent />
          </div>
          <HeroImage />
        </div>

        <div className="mt-14 flex justify-start lg:mt-20">
          <ScrollIndicator />
        </div>
      </Container>
    </Section>
  )
}

export { HeroSection }
