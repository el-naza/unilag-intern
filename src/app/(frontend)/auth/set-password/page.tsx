'use client'

import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import resetPassword from '@/services/resetPassword'
import verifyStudentOTP from '@/services/verifyStudentOTP'
import { authStore } from '@/store/authStore'
import { passwordRegex } from '@/utilities'
import { useForm, useStore } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(true)

  const passwordResetToken = useStore(authStore, (state) => state.passwordResetToken)

  const resetPasswordMtn = useMutation({
    mutationFn: async (password: string) => {
      try {
        const res = await resetPassword('students', password, passwordResetToken)
        console.log('res', res)
        if (!res) {
          const errMsg = 'Network err; pls try again later'
          toast.error(errMsg)
          return errMsg
        }

        if (res.success) return

        return res.data?.message
      } catch {
        const errMsg = 'An error occured; pls try again later'
        toast.error(errMsg)
        return errMsg
      }
    },
  })

  const form = useForm<{ password: string; confirmPassword: string }>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (!value.password) {
          return {
            form: 'Please enter your new password to proceed.',
            fields: { password: 'Password cannot be empty!' },
          }
        }

        if (!value.confirmPassword) {
          return {
            form: 'Please confirm your new password to proceed.',
            fields: { confirmPassword: 'Confirm password cannot be empty!' },
          }
        }

        if (value.password !== value.confirmPassword) {
          return {
            form: 'Please confirm your new password to proceed.',
            fields: { confirmPassword: "Passwords don't match!" },
          }
        }

        if (value.password.length !== 8) {
          return {
            form: 'Password must be up to 8 characters.',
            fields: {},
          }
        }

        if (!passwordRegex.test(value.password)) {
          return {
            form: 'Passwords must be alphanumeric with at least 1 uppercase, 1 lowercase and 1 symbol.',
            fields: {},
          }
        }

        const error = await resetPasswordMtn.mutateAsync(value.password)
        if (error) {
          return {
            form: error!,
            fields: {},
          }
        }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('OTP verification is successful')
        router.push('/auth/login')

        return null
      },
    },
  })

  return (
    <div className="flex bg-[url(/images/auth-bg.png)] bg-right">
      <div className="container max-w-xl m-auto">
        <div className="px-4 text-white pt-11">
          <div className="text-center">
            <h2 className="text-xl lg:text-4xl leading-[25.78px] font-medium mb-3">Set Password</h2>
            <div className="text-[12px] lg:text-sm text-gray-light-2 leading-[16.5px] mb-8">
              Set a new password to proceed.
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <Label>New Password</Label>
            <form.Field name="password">
              {(field) => {
                return (
                  <>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Password"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>

            <Label className="mt-3 block">Re-enter New Password</Label>
            <form.Field name="confirmPassword">
              {(field) => {
                return (
                  <>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Password"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    size="lg"
                    className="w-full mt-8 text-gr"
                  >
                    Confirm {isSubmitting && <Spinner />}
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
