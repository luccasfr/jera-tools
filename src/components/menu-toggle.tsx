import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

type MenuToggleProps = {
  className?: string
} & React.ComponentPropsWithoutRef<'button'>

export default function MenuToggle({ className, ...props }: MenuToggleProps) {
  return (
    <Button variant="outline" size="icon" className={className} {...props}>
      <Menu />
    </Button>
  )
}
