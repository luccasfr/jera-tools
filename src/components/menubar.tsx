'use client'
import { Braces, Database, Hash, HomeIcon, Percent } from 'lucide-react'
import MenubarLink from './menubar-link'

type SidebarProps = {
  className?: string
  onClose?: () => void
}

export default function Menubar({ className, onClose }: SidebarProps) {
  return (
    <div className={`h-full border-r-[1px] border-r-border p-2 ${className}`}>
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
    </div>
  )
}
