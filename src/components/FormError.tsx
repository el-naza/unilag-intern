import { FormApi } from '@tanstack/react-form'

export default function FormError({ form }: { form: FormApi<any, any> }) {
  return (
    <>
      {form.state.errors.length ? (
        <div className="text-[10px] leading-[16.5px] text-error mt-2">
          {form.state.errors.join(',')}
        </div>
      ) : null}
    </>
  )
}
