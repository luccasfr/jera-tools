'use client'
import { Braces, Database, Hash, HomeIcon, Percent } from 'lucide-react'
import MenubarLink from './menubar-link'
import Link from 'next/link'
import { cva } from 'class-variance-authority'
import { useEffect, useState } from 'react'

type MenubarProps = {
  className?: string
}

const menubarVariants = cva(
  'h-full flex-col justify-between border-r-[1px] border-r-border p-2 ${className}',
  {
    variants: {
      variant: {
        default: '',
        mobile: 'pb-20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export default function Menubar({ className }: MenubarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const mobileKeywords = ['iphone', 'android', 'windows phone', 'blackberry']

    const isMobileDevice = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword),
    )

    setIsMobile(isMobileDevice)
  }, [])

  return (
    <div
      className={menubarVariants({
        className,
        variant: isMobile ? 'mobile' : 'default',
      })}
    >
      <div className="flex flex-col gap-1">
        <MenubarLink href="/">
          <HomeIcon size={14} />
          home
        </MenubarLink>
        <MenubarLink href="/generate-hash">
          <Hash size={14} />
          generate hash
        </MenubarLink>
        <MenubarLink href="/url-encode">
          <Percent size={14} />
          url encode
        </MenubarLink>
        <MenubarLink href="/generate-guid">
          <Braces size={14} />
          generate guid
        </MenubarLink>
        <MenubarLink href="/database-url">
          <Database size={14} />
          generate db url
        </MenubarLink>
      </div>
      <footer className="px-1 py-4 text-right text-xs text-primary/60">
        <p>
          ❤ proudly made by{' '}
          <Link
            className="text-primary/90 underline-offset-2 hover:underline"
            href="https://github.com/luccasfr"
            target="_blank"
          >
            lucas ferreira
          </Link>
        </p>
        <p>
          <Link
            className="text-primary/90 underline-offset-2 hover:underline"
            href="https://jerasoft.com.br"
            target="_blank"
          >
            jerasoft
          </Link>{' '}
          &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
