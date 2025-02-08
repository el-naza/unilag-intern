import { FieldApi } from '@tanstack/react-form'

export default function FieldError({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div className="text-[10px] leading-[16.5px] text-error">
          {field.state.meta.errors.join(',')}
        </div>
      ) : null}
    </>
  )
}
