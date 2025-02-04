'use client'

import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import verifyStudentOTP from '@/services/verifyStudentOTP'
import { authStore } from '@/store/authStore'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
  const router = useRouter()
  const authState = useStore(authStore)

  useEffect(() => {
    if (!authState.email || !authState.matricNo) router.replace('/auth/forgot-password')
  }, [])

  const verifyOtpMtn = useMutation({
    mutationFn: async (otp: string) => {
      try {
        const res = await verifyStudentOTP({ matricNo: authState.matricNo, otp })
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
        router.push('/auth/set-password')

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
              OTP Confirmations
            </h2>
            <div className="text-[12px] lg:text-sm text-gray-light-2 leading-[16.5px] mb-8">
              An OTP has been sent to{' '}
              <span className="text-accent-orange">{authState.email || 'example@gmail.com'}</span>,
              Please check your inbox to retrieve it and proceed.
            </div>
          </div>

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
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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
                    Proceed {isSubmitting && <Spinner />}
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
