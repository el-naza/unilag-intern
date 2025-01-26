import FooterKoonage from '../components/Layouts/FooterKoonage'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <FooterKoonage />
    </div>
  )
}
