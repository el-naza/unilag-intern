import { cn } from '@/utilities'
import { FieldApi } from '@tanstack/react-form'

export default function FieldError({
  field,
  className,
}: {
  field: FieldApi<any, any, any, any>
  className?: string
}) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div className={cn('text-[10px] leading-[16.5px] text-error', className)}>
          {field.state.meta.errors.join(',')}
        </div>
      ) : null}
    </>
  )
}
