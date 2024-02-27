import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Summary({ className, children }: Props) {
  return (
    <p className={`lowercase text-primary/60 md:text-sm ${className}`}>
      {children}
    </p>
  )
}
