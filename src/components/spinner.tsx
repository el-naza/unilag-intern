import { cn } from '@/utilities'

interface SpinnerProps {
  className?: string
  outerSize?: string
  childSize?: string
  color?: string
}
export default function Spinner({ className, outerSize, childSize, color }: SpinnerProps) {
  return (
    <div
      className={cn(
        'h-6 aspect-square animate-spin items-center justify-center rounded-full border-white border-[3px]',
        className,
        outerSize,
        'border-b-transparent',
      )}
    ></div>
  )
}
