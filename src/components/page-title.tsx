import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function PageTitle({ children }: Props) {
  return <h1 className="font-mono text-2xl lowercase">{children}</h1>
}
