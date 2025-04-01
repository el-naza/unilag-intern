import LayoutClient from './layout.client'

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen min-w-screen "
      style={{
        background: `linear-gradient(to bottom, rgba(64, 138, 126, 0.12), white, rgba(64, 138, 126, 0.12))`,
      }}
    >
      <LayoutClient>{children}</LayoutClient>

      <div className="flex items-center justify-center lg:pt-[32px] lg:pb-[54px] py-[20px] fixed  bottom-0 w-full bg-[#eef7fa]">
        <p className="font-[400] text-[14px] text-[#48484A] text-center px-[20px]">
          Need Help? Contact our support team with{' '}
          <span className="text-[#0B7077]">090 0000 1234.</span>{' '}
        </p>
      </div>
    </div>
  )
}
