import { Hash, HomeIcon, Percent } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarLink from './sidebar-link'

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={`h-full border-r-[1px] border-r-border p-2 ${className}`}>
      <div className="flex flex-col gap-1 font-mono">
        <SidebarLink href="/">
          <HomeIcon size={14} />
          home
        </SidebarLink>
        <SidebarLink href="/generate-hash">
          <Hash size={14} />
          generate-hash
        </SidebarLink>
        <SidebarLink href="/url-encode">
          <Percent size={14} />
          url-encode
        </SidebarLink>
      </div>
    </div>
  )
}
