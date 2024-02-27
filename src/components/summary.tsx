import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Summary({ className, children }: Props) {
  return (
    <p className={`text-sm lowercase text-primary/60 ${className}`}>
      {children}
    </p>
  )
}
