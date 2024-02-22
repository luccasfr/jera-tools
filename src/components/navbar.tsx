import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Hammer } from 'lucide-react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div
      className="border-b-primary-foreground bg-background fixed 
                 top-0 z-50 flex w-full justify-between
                 border-b-[1px] bg-opacity-10 p-4 backdrop-blur"
    >
      <div className="my-auto">
        <div className="inline-flex gap-1 text-xl font-semibold">
          <Hammer size={24} className="translate-y-[0.1rem]" />
          <p>jera.tools</p>
        </div>
      </div>
      <div className="flex items-center">
        {/* <div className="px-4">Home</div>
        <div className="px-4">About</div>
        <div className="px-4">Contact</div> */}
        <ModeToggle />
      </div>
    </div>
  )
}
