'use client'

import { Check, type LucideIcon, Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type ModeToggleItemProps = {
  icon: LucideIcon
  theme: string
}
function ModeToggleItem({ icon: Icon, theme }: ModeToggleItemProps) {
  const { theme: actualTheme, setTheme } = useTheme()

  return (
    <DropdownMenuItem
      className="flex items-center justify-between"
      onClick={() => setTheme(theme)}
    >
      {actualTheme === theme ? (
        <Check className="size-4" />
      ) : (
        <Icon className="size-4" />
      )}
      <p>{theme}</p>
    </DropdownMenuItem>
  )
}

export function ModeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90
              dark:scale-0"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0
              dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ModeToggleItem icon={Sun} theme="light" />
        <ModeToggleItem icon={Moon} theme="dark" />
        <ModeToggleItem icon={SunMoon} theme="system" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
