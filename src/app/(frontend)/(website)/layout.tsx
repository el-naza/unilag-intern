'use client'

import Footer from './_components/footer'
import Navbar from './_components/nav-bar'
import { usePathname } from 'next/navigation'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current path is /waitlist or /waitlist-signup-success
  const isWaitinglistPage =
    pathname === '/waitinglist' || pathname === '/waitinglist-signup-success'

  return (
    <>
      {!isWaitinglistPage && <Navbar />}
      <main>{children}</main>
      {!isWaitinglistPage && <Footer />}
    </>
  )
}
