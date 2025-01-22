export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen min-w-screen"
      style={{
        background: `linear-gradient(to bottom, rgba(64, 138, 126, 0.12), white, rgba(64, 138, 126, 0.12))`,
      }}
    >
      {children}
    </div>
  )
}
