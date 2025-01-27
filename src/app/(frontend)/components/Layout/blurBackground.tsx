interface blurBackgroundProps {
  background?: string
  children: React.ReactNode
}
export default function BlurBackground({
  children,
  background = 'bg-[#FAFAFA99]',
}: blurBackgroundProps) {
  return (
    <div
      className={` lg:p-[12px] border border-[#F1F1F1] rounded-[12px] ${background} mt-[12px] backdrop-blur-lg pb-[100px] lg:pb-0 `}
    >
      {children}
    </div>
  )
}
