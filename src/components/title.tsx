import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

type TitleProps = {
  children: React.ReactNode
  variant?: VariantProps<typeof titleVariants>['variant']
}

const titleVariants = cva('font-mono font-bold lowercase', {
  variants: {
    variant: {
      title: 'text-2xl',
      'sub-title': 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'title',
  },
})

export default function Title({ children, variant }: TitleProps) {
  return (
    <h1
      className={titleVariants({
        variant,
      })}
    >
      {children}
    </h1>
  )
}
