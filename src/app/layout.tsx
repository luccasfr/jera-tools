import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/menubar'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'jera.tools',
  description: 'tools for jerasoft developers',
}

export default function RootLayout({
  children,
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
          <Navbar />
          <div className="flex h-full pt-[73px]">
            <Sidebar className="hidden min-w-44 md:block" />
            <div className="flex-1 overflow-auto px-4 py-2">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
