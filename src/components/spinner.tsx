import { cn } from '@/utilities'

interface SpinnerProps {
  className?: string
  outerSize?: string
  childSize?: string
}
export default function Spinner({ className, outerSize, childSize }: SpinnerProps) {
  return (
    <div
      className={cn(
        'h-6 aspect-square animate-spin items-center justify-center rounded-full border-white border-[3px] border-b-transparent',
        className,
        outerSize,
      )}
    ></div>
  )
}
