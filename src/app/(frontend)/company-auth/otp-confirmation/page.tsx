'use client'

import ArrowIcon from '../../assets/icons/arrow'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import Spinner from '@/components/spinner'
import { toast } from 'sonner'
import { authStore } from '@/store/authStore'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useStore } from '@tanstack/react-store'
import { useEffect } from 'react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import { Button } from '@/components/ui/button'
import verifyCompanyOTP from '@/services/company/verifyCompanyOTP'
import useSendCompanyOtpMtn from '../forgot-password/useSendCompanyOtpMtn'
import Link from 'next/link'

export default function OTPConfirmation() {
  const router = useRouter()
  const authState = useStore(authStore)

  // useEffect(() => {
  //   if (!authState.email) router.replace('/auth/forgot-password')
  // }, [])
  const sendOtpMtn = useSendCompanyOtpMtn()

  const handleResendOTP = async ({ email }) => {
    const error = await sendOtpMtn.mutateAsync(email)
    if (error) {
      return {
        form: error!,
        fields: {},
      }
    }

    // success here so naviagate or toast to success !!

    toast.success('OTP sent successfully')
    router.push('/company-auth/otp-confirmation')

    return null
  }

  const verifyOtpMtn = useMutation({
    mutationFn: async (otp: string) => {
      try {
        const res = await verifyCompanyOTP({ email: authState.email, otp })
        console.log('res', res)
        if (!res) {
          const errMsg = 'Network err; pls try again later'
          toast.error(errMsg)
          return errMsg
        }

        if (res.token) {
          authStore.setState((state) => {
            return {
              ...state,
              passwordResetToken: res.token!,
            }
          })

          return
        }

        return res.message
      } catch {
        const errMsg = 'An error occured; pls try again later'
        toast.error(errMsg)
        return errMsg
      }
    },
  })

  const form = useForm<{ otp: string }>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (!value.otp) {
          return {
            form: 'Please fill out the boxes with the OTP you received to proceed.',
            fields: { otp: 'Required!' },
          }
        }

        if (value.otp.length !== 6) {
          return {
            form: 'Some boxes are empty. Please fill out all the boxes to proceed.',
            fields: { otp: 'Incomplete!' },
          }
        }

        const error = await verifyOtpMtn.mutateAsync(value.otp)
        if (error) {
          return {
            form: error!,
            fields: {},
          }
        }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('OTP verification is successful')
        router.push('/company-auth/set-password')

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
        An OTP has been sent to{' '}
        <span className="text-accent-orange">{authState.email || 'example@gmail.com'}</span>, Please
        check your inbox to retrieve it and proceed.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Label>Enter OTP</Label>
        <form.Field
          name="otp"
          children={(field) => {
            return (
              <>
                <InputOTP
                  value={field.state.value || ''}
                  onChange={field.handleChange}
                  onComplete={field.handleBlur}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border" />
                    <InputOTPSlot index={1} className="border" />
                    <InputOTPSlot index={2} className="border" />
                    <InputOTPSlot index={3} className="border" />
                    <InputOTPSlot index={4} className="border" />
                    <InputOTPSlot index={5} className="border" />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError field={field} />
              </>
            )
          }}
        />

        <span className='cursor-pointer ' onClick={() => router.push('/company-auth/forgot-password')}>
          Resend
        </span>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <Button type="submit" disabled={!canSubmit} size="lg" className="w-full mt-8 text-gr">
                Proceed {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
