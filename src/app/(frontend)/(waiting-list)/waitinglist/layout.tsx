import Footer from '../../unilag/_components/waitlist-footer'
import Navbar from '../../unilag/_components/waitlist-navbar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
