'use client'

import ArrowIcon from '../../assets/icons/arrow'
import Spinner from '@/components/spinner'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/react-form'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import useSendCompanyOtpMtn from './useSendCompanyOtpMtn'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OTPConfirmation() {
  const router = useRouter()

  const sendOtpMtn = useSendCompanyOtpMtn()

  const form = useForm<{ email: string }>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (!value.email) {
          return {
            form: 'Please enter your company email to proceed.',
            fields: { email: 'Required!' },
          }
        }

        const error = await sendOtpMtn.mutateAsync(value.email)
        if (error) {
          return {
            form: error!,
            fields: {},
          }
        }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('OTP sent successfully')
        router.push('/company-auth/otp-confirmation')

        return null
      },
    },
  })
  return (
    <div className="">
      <button
        onClick={() => router.back()}
        className="font-[400] text-[14px] flex items-center gap-3 text-[#0C0C0C]"
      >
        <ArrowIcon /> Back
      </button>
      <h2 className="font-[500] text-[24px] text-center mt-[40px]">OTP Confirmations</h2>
      <p className="text-center text-[#8E8E93] font-[400] text-[14px] mt-8 mb-[40px]">
        Enter your company email, and we&apos;ll send an OTP to the associated email address for you
        to change your password.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Label>Comapany Email</Label>
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <Input
                  name={field.name}
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your company email"
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-black border"
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
                color="white"
              >
                Send OTP {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
