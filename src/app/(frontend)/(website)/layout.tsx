'use client'

import Footer from './_components/footer'
import Navbar from './_components/nav-bar'
import { usePathname } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  
  const [sessionData, setSessionData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()

      if (!session) {
        console.error('No session found')
        // Optionally redirect or show login prompt
      } else {
        setSessionData(session)
      }

      setLoading(false)
    }

    fetchSession()
  }, [])

  const pathname = usePathname()

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Navbar />
        <main>{children}</main>
      <Footer />
    </>
  )
}
