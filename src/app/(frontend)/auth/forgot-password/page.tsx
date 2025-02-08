'use client'

import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useSendStudentOtpMtn from './useSendStudentOtpMtn'

export default function Page() {
  const router = useRouter()

  const sendOtpMtn = useSendStudentOtpMtn()

  const form = useForm<{ matricNo: string }>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (!value.matricNo) {
          return {
            form: 'Please enter your matric number to proceed.',
            fields: { matricNo: 'Required!' },
          }
        }

        const error = await sendOtpMtn.mutateAsync(value.matricNo)
        if (error) {
          return {
            form: error!,
            fields: {},
          }
        }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('OTP sent successfully')
        router.push('/auth/otp-confirmation')

        return null
      },
    },
  })

  return (
    <div className="flex bg-[url(/images/auth-bg.png)] bg-right">
      <div className="container max-w-xl m-auto">
        <div className="px-4 text-white pt-11">
          <div className="text-center">
            <h2 className="text-xl lg:text-4xl leading-[25.78px] font-medium mb-3">
              Forgotten Password
            </h2>
            <div className="text-[12px] lg:text-sm text-gray-light-2 leading-[16.5px] mb-8">
              Enter your matriculation number, and we&apos;ll send an OTP to the associated email
              address for you to change your password.
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <Label>Username</Label>
            <form.Field
              name="matricNo"
              children={(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Matric Number"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            />

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    size="lg"
                    className="w-full mt-8 text-gr"
                  >
                    Send OTP {isSubmitting && <Spinner />}
                  </Button>
                  <FormError form={form} />
                </>
              )}
            </form.Subscribe>
          </form>
        </div>
      </div>
    </div>
  )
}
