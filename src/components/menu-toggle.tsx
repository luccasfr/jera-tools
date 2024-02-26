import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

type MenuToggleProps = {
  className?: string
  open?: boolean
} & React.ComponentPropsWithoutRef<'button'>

export default function MenuToggle({ className, ...props }: MenuToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`${className} flex transition-transform duration-500 md:hidden`}
      {...props}
    >
      <Menu
        className={`${props.open ? '-rotate-90 duration-300' : 'rotate-0 duration-500'}`}
      />
    </Button>
  )
}
