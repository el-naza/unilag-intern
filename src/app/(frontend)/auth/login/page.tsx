'use client'

import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StudentAuthOperations } from '@/payload-types'
import studentPreLogin from '@/services/studentPreLogin'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Field, ValidationFieldError } from 'payload'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import useSendStudentOtpMtn from '../forgot-password/useSendStudentOtpMtn'

export default function Page() {
  const [redirect, setRedirect] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirectParam = params.get('redirect')
    if (redirectParam) setRedirect(redirectParam)
  }, [])

  const [hasPassword, setHasPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const requiredFields = useMemo(
    () => [
      {
        name: 'username',
        type: 'text',
        required: true,
      },
      ...(hasPassword
        ? [
            {
              name: 'password',
              type: 'text',
              required: true,
            },
          ]
        : []),
    ],
    [hasPassword],
  )
  const router = useRouter()

  const studentPreLoginMtn = useMutation({
    mutationFn: async (matricNo: string) => {
      try {
        const res = await studentPreLogin({ matricNo })
        console.log('res', res)
        if (!res) {
          const message = 'Network err; pls try again later'
          toast.error(message)
          return { message }
        }
        return res
      } catch {
        const message = 'An error occured; pls try again later'
        toast.error(message)
        return { message }
      }
    },
  })

  const sendOtpMtn = useSendStudentOtpMtn()

  const signInStudentMtn = useMutation({
    mutationFn: async ({ username, password }: StudentAuthOperations['login']) => {
      try {
        const result = await signIn('credentials', {
          username,
          password,
          col: 'students',
          redirect: false,
        })

        console.log('login result', result)

        if (!result?.url) {
          return 'Invalid credentials, please try again'
        }

        return
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              console.log('*****err', error.message)
              if (error.message) {
                let nonsense = 'Read more at https://errors.authjs.dev#credentialssignin'
                if (error.message.endsWith(nonsense)) {
                  return (
                    error.message.substring(0, error.message.length - nonsense.length) ||
                    'Invalid credential.'
                  )
                }
                return error.message
              }

              return 'Invalid credential.'
            default:
              console.log('err', error)
              return 'Something went wrong.'
          }
        }

        const message = 'An error occured; pls try again later'
        return message
      }
    },
  })

  const form = useForm<StudentAuthOperations['login']>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        const emptyRequiredFields = requiredFields.reduce<object>(
          (acc: ValidationFieldError, field: Field & { required: boolean; name: string }) => ({
            ...acc,
            ...(field?.required && !value[field.name] && { [field.name]: 'Required' }),
          }),
          {},
        )

        if (Object.keys(emptyRequiredFields).length) {
          return {
            form: 'Some required fields are missing. Please fill out all mandatory fields to proceed.',
            fields: emptyRequiredFields,
          }
        }

        if (!hasPassword) {
          const res = await studentPreLoginMtn.mutateAsync(value.username)
          console.log('pre login res', res)

          if (res.ready) {
            toast.message(res.message)
            setHasPassword(true)
            return null
          } else if (res.ready === false) {
            toast.error(res.message)

            const error = await sendOtpMtn.mutateAsync(value.username)
            if (error) {
              toast.error('Failed to auto-request OTP; pls request an OTP manually')
              router.push('/auth/forgot-password')
              return
            }

            toast.message(`Use the OTP sent to set your password`)

            router.push('/auth/otp-confirmation')
            return null
          } else {
            toast.error(res.message)
            return {
              form: res.message,
              fields: {},
            }
          }
        }

        const error = await signInStudentMtn.mutateAsync(value)
        if (error)
          return {
            form: error!,
            fields: {},
          }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('Sign in successful')
        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/student')
        }

        return null
      },
    },
  })

  return (
    <div className="flex lg:bg-[url(/images/auth-bg.png)] bg-right">
      <div className="container max-w-xl m-auto">
        <div className="px-4 text-white pt-11 lg:pt-0">
          <div className="text-center">
            <h2 className="text-xl lg:text-4xl leading-[25.78px] font-medium mb-3">
              Login as a SIWES Applicant
            </h2>
            <div className="text-[12px] lg:text-sm text-gray-light-2 leading-[16.5px] mb-8">
              {hasPassword
                ? 'Please enter your password to proceed.'
                : 'Enter your matriculation number to continue'}
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
            <form.Field name="username">
              {(field) => {
                return (
                  <>
                    <Input
                      disabled={hasPassword}
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
            </form.Field>
            {hasPassword && (
              <>
                <Label className="mt-3 block">Password</Label>
                <form.Field
                  name="password"
                  children={(field) => {
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
                />
                <Link
                  href="/auth/forgot-password"
                  className="text-accent-teal underline text-[12px] leading-[16.5px]"
                >
                  Forgotten Password
                </Link>
              </>
            )}

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    size="lg"
                    className="w-full mt-8 text-gr"
                  >
                    {hasPassword ? 'Login' : 'Continue'} {isSubmitting && <Spinner />}
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
