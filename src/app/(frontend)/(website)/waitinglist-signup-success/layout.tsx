import Footer from './../_components/waitlist-footer'
import Navbar from './../_components/waitlist-navbar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
