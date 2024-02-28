'use client'
import useDebounce from '@/hooks/debounce'
import menuItems from '@/lib/menu-items'
import { cva } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import Footer from './footer'
import MenubarLink from './menubar-link'
import { Input } from './ui/input'
import { X } from 'lucide-react'
import { useUIInfo } from './ui-info'

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

type MenubarProps = {
  className?: string
}

export default function Menubar({ className }: MenubarProps) {
  const { isMobile } = useUIInfo()
  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 100)

  const handleClearSearch = () => {
    setSearch('')
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchDebounced.toLowerCase()),
  )

  return (
    <div
      className={menubarVariants({
        className,
        variant: isMobile ? 'mobile' : 'default',
      })}
    >
      <div>
        <div className="relative h-fit w-full">
          <Input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          {searchDebounced && (
            <div
              className="group absolute right-1 top-3 cursor-pointer"
              onClick={handleClearSearch}
            >
              <X size={16} className="group-hover:opacity-60" />
            </div>
          )}
        </div>
        <div
          className="flex flex-col gap-1"
          onClick={(e) => {
            if (e.target instanceof HTMLAnchorElement) {
              handleClearSearch()
            }
          }}
        >
          {filteredMenuItems.length === 0 && (
            <div className="flex items-center justify-center gap-1 text-primary/60">
              <p className="text-xs ">nothing found</p>
            </div>
          )}
          {filteredMenuItems.map((item) => (
            <MenubarLink href={item.href} key={item.href}>
              {item.icon}
              {item.label}
            </MenubarLink>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
