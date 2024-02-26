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
      className={`fixed left-1/2 z-40 h-full w-full -translate-x-1/2 bg-background transition-transform duration-300 ${!open ? '-translate-y-full' : 'translate-y-[80px]'}`}
      style={{ maxHeight: 'calc(100vh - 80px)' }}
      onClick={handleClose}
    >
      <Menubar />
    </div>
  )
}
