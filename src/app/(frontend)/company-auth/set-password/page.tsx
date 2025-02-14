'use client'
import MailIcon from '../../assets/icons/mail'
import ArrowIcon from '../../assets/icons/arrow'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authStore } from '@/store/authStore'
import { passwordRegex } from '@/utilities'
import { useForm, useStore } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import resetPassword from '@/services/resetPassword'

export default function OTPConfirmation() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(true)

  const passwordResetToken = useStore(authStore, (state) => state.passwordResetToken)

  const resetPasswordMtn = useMutation({
    mutationFn: async (password: string) => {
      try {
        const res = await resetPassword('companies', password, passwordResetToken)
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

        if (value.password.length < 8) {
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
        toast.success('Password set successfully')
        router.push('/company-auth/login')

        return null
      },
    },
  })

  return (
    <div className="">
      <button
        // onClick={goBack}
        className="font-[400] text-[14px] flex items-center gap-3 text-[#0C0C0C]"
      >
        <ArrowIcon /> Back
      </button>
      <h2 className="font-[500] text-[24px] text-center mt-[40px]">Set Password</h2>
      <p className="text-center text-[#8E8E93] font-[400] text-[14px] mt-8 mb-[40px]">
        Set a new password to proceed.
      </p>

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
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border"
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
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border"
                />
                <FieldError field={field} />
              </>
            )
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <Button type="submit" disabled={!canSubmit} size="lg" className="w-full mt-8 text-gr">
                Confirm {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>
      <p className="font-[400] text-[12px] text-[#8E8E93] leading-[16px] mt-[12px] text-center">
        Not registered yet? Sign up now to connect withcc top talent effortlessly!{' '}
        <span className="text-[#007AFF] cursor-pointer">Sign up as a company</span>
      </p>
      {/* )} */}
    </div>
  )
}
