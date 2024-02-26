'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href: string
}

export default function MenubarLink({ children, href }: Props) {
  const path = usePathname()
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 rounded p-1 text-sm transition-colors duration-500
            ${path === href && 'bg-foreground text-background'}`}
    >
      {children}
    </Link>
  )
}
