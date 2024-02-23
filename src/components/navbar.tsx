import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Hammer } from 'lucide-react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div
      className="fixed top-0 z-50 
                 flex w-full justify-between border-b-[1px] border-b-border
                 bg-background bg-opacity-10 px-2 py-4 backdrop-blur"
    >
      <div className="my-auto">
        <div className="inline-flex gap-1 text-xl font-semibold">
          <Hammer size={24} className="translate-y-[0.1rem]" />
          <p>jera.tools</p>
        </div>
      </div>
      <div className="flex items-center">
        <ModeToggle />
      </div>
    </div>
  )
}
