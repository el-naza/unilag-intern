'use client'

import { cn } from 'src/utilities/cn'
import {
  Poppins,
  Inter,
  Nunito,
  Oleo_Script_Swash_Caps,
  Noto_Sans,
  Manrope,
  Roboto,
} from 'next/font/google'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import 'animate.css'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['sans-serif'],
})

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['sans-serif'],
})

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['sans-serif'],
})

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  fallback: ['sans-serif'],
})

const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  fallback: ['sans-serif'],
})

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
  fallback: ['sans-serif'],
})

const oleoScriptSwashCaps = Oleo_Script_Swash_Caps({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-oleo-script-swash-caps',
  display: 'swap',
  fallback: ['sans-serif'],
})

const queryClient = new QueryClient()
function DynamicFavicon() {
  const pathname = usePathname()

  useEffect(() => {
    const head = document.head
    const existingIcons = head.querySelectorAll('link[rel="icon"]')
    existingIcons.forEach((icon) => head.removeChild(icon))

    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = pathname.startsWith('/unilag') ? '/images/unilag-logo.png' : '/icons/intrn-icon.png'
    head.appendChild(link)
  }, [pathname])

  return null
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(
        poppins.variable,
        poppins.className,
        inter.variable,
        inter.className,
        nunito.variable,
        oleoScriptSwashCaps.variable,
        notoSans.variable,
        roboto.variable,
        manrope.variable,
        'tracking-[0.37px]',
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* <link href="/icons/intrn-icon.png" rel="icon" sizes="32x32" />
        <link href="/icons/intrn-icon.svg" rel="icon" type="image/svg+xml" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <QueryClientProvider client={queryClient}>
              <DynamicFavicon />
              <div className="tracking-[0.37px]">{children}</div>
            </QueryClientProvider>
          </LocalizationProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
