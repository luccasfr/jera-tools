'use client'
import { Braces, Database, Hash, HomeIcon, Percent } from 'lucide-react'
import MenubarLink from './menubar-link'
import Link from 'next/link'

type MenubarProps = {
  className?: string
  onClose?: () => void
}

export default function Menubar({ className, onClose }: MenubarProps) {
  return (
    <div
      className={`h-full flex-col justify-between border-r-[1px] border-r-border p-2 ${className}`}
    >
      <div className="flex flex-col gap-1 font-mono">
        <MenubarLink href="/">
          <HomeIcon size={14} />
          home
        </MenubarLink>
        <MenubarLink href="/generate-hash">
          <Hash size={14} />
          generate-hash
        </MenubarLink>
        <MenubarLink href="/url-encode">
          <Percent size={14} />
          url-encode
        </MenubarLink>
        <MenubarLink href="/generate-guid">
          <Braces size={14} />
          generate-guid
        </MenubarLink>
        <MenubarLink href="/database-url">
          <Database size={14} />
          database-url
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
