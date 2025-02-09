import { SessionProvider } from 'next-auth/react'
import FooterKoonage from '../components/Layouts/FooterKoonage'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div>
        {children}
        <FooterKoonage />
      </div>
    </SessionProvider>
  )
}
