'use client'

import { cn } from 'src/utilities/cn'
import { Poppins } from 'next/font/google'
import React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['sans-serif'],
})

const queryClient = new QueryClient()

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(poppins.variable, poppins.className, 'tracking-[0.37px]')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <div className="tracking-[0.37px]">{children}</div>
          </QueryClientProvider>
        </LocalizationProvider>
        <Toaster />
      </body>
    </html>
  )
}
