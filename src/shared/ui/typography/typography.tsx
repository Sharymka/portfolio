import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const typographyVariants = cva("text-balance", {
  variants: {
    variant: {
      h1: "font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl",
      h2: "font-heading text-3xl font-semibold leading-tight text-foreground",
      h3: "font-heading text-xl font-medium leading-snug text-foreground",
      lead: "text-lg leading-8 text-muted-foreground",
      p: "text-base leading-7 text-foreground",
      muted: "text-sm leading-6 text-muted-foreground",
      small: "text-sm font-medium leading-none text-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  lead: "p",
  p: "p",
  muted: "p",
  small: "p",
} as const

type TypographyVariant = keyof typeof defaultElements

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType
  }

function Typography({
  as,
  className,
  variant = "p",
  ...props
}: TypographyProps) {
  const resolvedVariant = (variant ?? "p") as TypographyVariant
  const Component = as ?? defaultElements[resolvedVariant]

  return (
    <Component
      data-slot="typography"
      className={cn(
        typographyVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
