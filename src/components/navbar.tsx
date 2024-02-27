'use client'
import { Hammer } from 'lucide-react'
import FullMenu from './full-menu'
import MenuToggle from './menu-toggle'
import { ModeToggle } from './mode-toggle'
import { useState } from 'react'

type Props = {}

export default function Navbar({}: Props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <FullMenu open={open} onClose={handleOpen} />
      <div
        className="fixed top-0 z-50 
                  flex w-full justify-between border-b-[1px] border-b-border
                  bg-background bg-opacity-10 px-2 py-4 backdrop-blur"
      >
        <div className="my-auto">
          <div className="inline-flex items-center gap-2 text-3xl font-semibold md:gap-1 md:text-xl">
            <Hammer className="h-9 w-9 md:h-6 md:w-6" />
            <p>jera.tools</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <MenuToggle open={open} onClick={handleOpen} />
        </div>
      </div>
    </>
  )
}
