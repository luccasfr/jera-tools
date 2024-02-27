import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Summary({ children }: Props) {
  return <p className="text-sm lowercase text-primary/60">{children}</p>
}
