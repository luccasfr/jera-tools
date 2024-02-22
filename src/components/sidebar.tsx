'use client'

import { Hash, HomeIcon, Percent } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const path = usePathname()

  return (
    <div className="border-r-primary-foreground h-full border-r-[1px] px-6">
      <div className="flex flex-col gap-1 font-mono">
        <Link
          href="/"
          className={`inline-flex items-center gap-1 rounded p-1 transition-colors duration-500 ${path === '/' && 'bg-foreground text-background'}`}
        >
          <HomeIcon size={14} />
          home
        </Link>
        <Link
          href="/generate-hash"
          className={`inline-flex items-center gap-1 rounded p-1 transition-colors duration-500  ${path === '/generate-hash' && 'bg-foreground text-background'}`}
        >
          <Hash size={14} />
          generate-hash
        </Link>
        <Link
          href="/url-encode"
          className={`inline-flex items-center gap-1 rounded p-1 transition-colors duration-500 ${path === '/url-encode' && 'bg-foreground text-background'}`}
        >
          <Percent size={14} />
          url-encode
        </Link>
      </div>
    </div>
  )
}
