'use client'

import Footer from './_components/footer'
import Navbar from './_components/nav-bar'
import { usePathname } from 'next/navigation'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
