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
          <header>
            <Navbar />
          </header>
          <main className="flex h-full pt-[80px]">
            <Menubar className="hidden md:flex" />
            <div className="mb-12 flex-1 space-y-4 overflow-visible px-4">
              {children}
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
