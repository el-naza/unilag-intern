import Footer from './_components/footer'
import Navbar from './_components/nav-bar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
        <main>{children}</main>
      <Footer />
    </>
  )
}
