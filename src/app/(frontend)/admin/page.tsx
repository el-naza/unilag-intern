'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { AdminAuthOperations } from '@/payload-types'
import { signIn } from 'next-auth/react'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'next-auth'
import { Field, ValidationFieldError } from 'payload'
import { toast } from 'sonner'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'

export default function AdminPage() {
  const [asDS, setAsDS] = React.useState(false)
  const [asSC, setAsSC] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(true)
  const router = useRouter()

  const requiredFields = React.useMemo(
    () => [
      {
        name: 'email',
        type: 'text',
        required: true,
      },
      {
        name: 'password',
        type: 'password',
        required: true,
      },
    ],
    [],
  )

  const goBack = () => {
    setAsDS(false)
    setAsSC(false)
  }

  const signInAdmin = useMutation({
    mutationFn: async ({ email, password }: AdminAuthOperations['login']) => {
      try {
        console.log('Payload', email, password)
        const result = await signIn('credentials', {
          email,
          password,
          col: 'admins',
          redirect: false,
        })

        console.log('Admin Login', result)

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
                const nonsense = 'Read more at https://errors.authjs.dev#credentialssignin'
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

  const form = useForm<AdminAuthOperations['login']>({
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

        const error = await signInAdmin.mutateAsync(value)
        if (error)
          console.log('Error on sigin: ', error);
          
          return {
            form: error!,
            fields: {},
          }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('Sign in successful')
        if (asDS) router.push('/admin/department-cordinator/home')
        if (asSC) router.push('/admin/siwes-cordinator/home')

        return null
      },
    },
  })

  return (
    <div>
      <div className="py-2 lg:px-24 md:px-16 sm:px-8 bg-white sticky top-0 w-full z-20">
        <Image src="/images/unilag-logo.png" alt="Logo" width={60} height={100} />
      </div>

      {!asDS && !asSC && (
        <div className="lg:max-w-[75vw] h-[90vh] sm:max-w-[90vw] mx-auto grid place-content-center">
          <div className="grid grid-cols-12">
            <div className="lg:col-span-5 sm:col-span-12 flex flex-col justify-center max-w-[45vw]">
              <h1 className="scroll-m-20 font-semibold tracking-tight lg:text-[30px] md:text-[25px] sm:text-[3rem] lg:leading-[2.8rem] lg:text-left md:text-center sm:text-center">
                Admin and Cordinator <br /> Dashboard For Siwes <br /> Management
              </h1>
              <p className="text-sm text-neutral-500 my-8 lg:text-left md:text-center sm:text-center">
                Utilize the potential of chatbots through simple messaging to boost your sales and
                provide excellent customer experiences.
              </p>

              <div className="flex gap-8">
                <Button className="bg-primary text-white w-full" onClick={() => setAsDS(true)}>
                  Login as DS
                </Button>
                <Button className="bg-secondary text-white w-full" onClick={() => setAsSC(true)}>
                  Login as SC
                </Button>
              </div>
            </div>

            <div className="lg:grid md:hidden sm:hidden place-content-center col-span-7">
              <Image
                src="/images/admin-onboard.png"
                alt="Logo"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {(asDS || asSC) && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="lg:max-w-[75vw] h-[90vh] sm:max-w-[90vw] mx-auto grid place-content-center">
            <div>
              <Button variant="ghost" onClick={() => goBack()}>
                <ChevronLeft /> Back
              </Button>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-medium tracking-tight lg:text-[30px] md:text-[25px] sm:text-[3rem]">
                Login as <br /> {asSC ? 'Siwes Corordinator' : 'Department Coordinator'}
              </h1>
              <p>Enter your email to continue your sign up process</p>
            </div>

            <div>
              <Label className="mt-3 block">Email</Label>
              <form.Field name="email">
                {(field) => {
                  return (
                    <>
                      <Input
                        name={field.name}
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        placeholder="Enter Email"
                        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                      />
                      <FieldError field={field} />
                    </>
                  )
                }}
              </form.Field>

              <Label className="mt-3 block">Password</Label>
              <form.Field name="password">
                {(field) => {
                  return (
                    <>
                      <Input
                        name={field.name}
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="password"
                        placeholder="Enter Password"
                        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
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
                      className="bg-secondary text-white w-full mt-8"
                      type="submit"
                      disabled={!canSubmit}
                    >
                      Login {isSubmitting && <Spinner />}
                    </Button>
                    <FormError form={form} />
                  </>
                )}
              </form.Subscribe>

              <p className="text-xs text-center mt-3">
                by clicking login you agree to the policy and privacy of the{' '}
                <Link href="" className="text-accent-blue">
                  Terms and agreement
                </Link>{' '}
                of this platform
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
