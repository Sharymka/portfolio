import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      default: "py-16 sm:py-20 lg:py-24",
      compact: "py-10 sm:py-12 lg:py-16",
      loose: "py-20 sm:py-24 lg:py-32",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
})

function Section({
  className,
  spacing,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    />
  )
}

export { Section, sectionVariants }

