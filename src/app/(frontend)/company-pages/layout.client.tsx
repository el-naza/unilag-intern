'use client'

import { useSession } from 'next-auth/react'
import Loader from '../components/Layouts/Loader'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  // console.log('session', session)
  // console.log('status', status)
  return status === 'authenticated' ? children : <Loader></Loader>
}
