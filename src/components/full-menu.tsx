import React from 'react'
import Menubar from './menubar'

type FullMenuProps = {
  open?: boolean
  onClose?: () => void
}

export default function FullMenu({ open, onClose }: FullMenuProps) {
  const handleClose = (e: React.MouseEvent) => {
    if ((e.target as HTMLAnchorElement).tagName === 'A') {
      onClose?.()
    }
  }
  return (
    <div
      className={`fixed left-1/2 z-40 block h-full w-full -translate-x-1/2 bg-background transition-transform md:hidden ${open ? 'translate-y-[73px] duration-300' : '-translate-y-[1000px] duration-500'}`}
      style={{ maxHeight: 'calc(100vh - 80px)' }}
      onClick={handleClose}
    >
      <Menubar className="flex" />
    </div>
  )
}
