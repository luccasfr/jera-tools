'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface UIInfo {
  isMobile?: boolean
  scrolled?: boolean
  scrollY?: number
  scrollX?: number
}

const UIInfoContext = createContext<UIInfo>({})

export function UIInfoProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [scroll, setScroll] = useState<Omit<UIInfo, 'isMobile'>>()

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const mobileKeywords = ['iphone', 'android', 'windows phone', 'blackberry']

    const isMobileDevice = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword)
    )
    setIsMobile(isMobileDevice)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      const scrolled = scrollY > 0

      setScroll({ scrollY, scrollX, scrolled })
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <UIInfoContext.Provider value={{ isMobile, ...scroll }}>
      {children}
    </UIInfoContext.Provider>
  )
}

export function useUIInfo() {
  return useContext(UIInfoContext)
}
