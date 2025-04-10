import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import Menubar from '@/components/menubar'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s / jera.tools',
    default: 'jera.tools'
  },
  description: 'tools for jerasoft developers'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed left-0 right-0 top-0 z-50">
            <Navbar />
          </header>
          <main className="flex h-screen">
            <Menubar className="hidden pt-[80px] md:flex" />
            <div className="flex-1 space-y-4 overflow-auto px-4 pb-4 pt-[80px]">
              {children}
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
