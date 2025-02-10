'use client'
import MailIcon from '../../assets/icons/mail'
import DynamicForm from '../../components/Form'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import ArrowIcon from '../../assets/icons/arrow'
import { useMutation } from '@tanstack/react-query'
import saveDoc from '@/services/saveDoc'
import { toast } from 'sonner'
import { Company, CompanyAuthOperations } from '@/payload-types'
import { log } from 'console'
import { signIn } from 'next-auth/react'
import { AuthError } from 'next-auth'
import companyPreLogin from '@/services/company/companyPreLogin'
import { useMemo, useState } from 'react'
import { Field, ValidationFieldError } from 'payload'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'lucide-react'
import useSendCompanyOtpMtn from '../forgot-password/useSendCompanyOtpMtn'

export default function Login() {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [otp, setOtp] = useState('')
  const [area, setArea] = useState('')
  const [step, setStep] = useState<
    'company' | 'showEmail' | 'showOTP' | 'showSignUp' | 'showUpload'
  >('showEmail')
  const [signUp, setSignUp] = useState<'formField' | 'file' | undefined>()
  const [file, setFile] = useState([])
  const [hasPassword, setHasPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [password, setPassword] = useState('')
  const requiredFields = useMemo(
    () => [
      {
        name: 'email',
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

  // const companyPreLoginMtn = useMutation({
  //   mutationFn: async (email: string) => {
  //     try {
  //       const res = await companyPreLogin({ email })
  //       console.log('res', res)
  //       if (!res) {
  //         const message = 'Network err; pls try again later'
  //         toast.error(message)
  //         return { message }
  //       }
  //       return res
  //     } catch {
  //       const message = 'An error occured; pls try again later'
  //       toast.error(message)
  //       return { message }
  //     }
  //   },
  // })

  // const handleLogin = () => {
  //   const newErrors: { [key: string]: string } = {}
  //   if (!companyName) newErrors.companyName = 'Company name is required.'
  //   setErrors(newErrors)

  //   if (Object.keys(newErrors).length === 0) {
  //     // Submit form
  //     switch (step) {
  //       case 'company':
  //         if (!companyName) {
  //           setErrors({ companyName: 'Company name is required.' })
  //         } else {
  //           setErrors({})
  //           setStep('showEmail') // Proceed to the next step
  //         }
  //         break

  //       case 'showEmail':
  //         if (!email) {
  //           setErrors({ email: 'Email is required.' })
  //         } else {
  //           setErrors({})
  //           setStep('showOTP') // Proceed to the next step
  //         }
  //         break

  //       case 'showOTP':
  //         if (!otp) {
  //           setErrors({ otp: 'OTP is required.' })
  //         } else {
  //           setErrors({})
  //           setStep('showSignUp') // Proceed to the next step
  //         }
  //         break

  //       default:
  //         console.log('Final step reached!')
  //     }
  //   }
  // }
  const companyPreLoginMtn = useMutation({
    mutationFn: async (email: string) => {
      try {
        const res = await companyPreLogin({ email })
        console.log('res', res)
        if (!res) {
          const message = 'Network err; pls try again later'
          toast.error(message)
          return { message }
        }
        return res
      } catch {
        const message = 'An error occurred; pls try again later'
        toast.error(message)
        return { message }
      }
    },
  })

  const sendOtpMtn = useSendCompanyOtpMtn()

  const signInCompanyMtn = useMutation({
    mutationFn: async ({ email, password }: CompanyAuthOperations['login']) => {
      try {
        console.log(email, password)
        const result = await signIn('credentials', {
          email, // Using email as email
          password,
          col: 'companies', // Specifying the collection as 'companies'
          redirect: false,
        })

        console.log('Company login result', result)

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

        return 'An error occurred; pls try again later'
      }
    },
  })


  const form = useForm<CompanyAuthOperations['login']>({
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
          const res = await companyPreLoginMtn.mutateAsync(value.email)
          console.log('pre login res', res)

          if (res?.ready) {
            toast.message(res.message)
            setHasPassword(true)
            return null
          } else if (!res.ready) {
            toast.error(res.message)

            const error = await sendOtpMtn.mutateAsync(value.email)
            console.log('sendOtpMtn', error)
            if (error) {
              toast.error('Failed to auto-request OTP; pls request an OTP manually')
              router.push('/company-auth/forgot-password')
              return
            }
            toast.message(`Use the OTP sent to set your password`)
            console.log("move to otp")
            router.push('/company-auth/otp-confirmation')
            return null
          } else {
            toast.error(res.message)
            return {
              form: res.message,
              fields: {},
            }
          }
        }

        const error = await signInCompanyMtn.mutateAsync(value)
        if (error)
          return {
            form: error!,
            fields: {},
          }

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('Sign in successful')
        router.push('/company-pages/home')

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
      <h2 className="font-[500] text-[24px] text-center mt-[40px]">
        {step === 'company'
          ? 'Login into your Siwes Company Profile'
          : step === 'showEmail' || step === 'showOTP'
            ? 'Company Login Confirmation'
            : signUp === 'formField' || signUp === 'file'
              ? 'Sign up as a Siwes Company'
              : ''}
      </h2>
      <p className="text-center text-[#8E8E93] font-[400] text-[14px] mt-8 mb-[40px]">
        {/* {success
          ? 'Complete this email address ex…………56@gmail.com and we’ll send you an OTP for confirmation.' */}
        {/* : ' */}
        Enter your company name to proceed with the login process
        {/* '} */}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Label>Comapny Email</Label>
        <form.Field name="email">
          {(field) => {
            return (
              <>
                <Input
                  disabled={hasPassword}
                  name={field.name}
                  type='email'
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Email"
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-black border"
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
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border"
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
              <Button type="submit" disabled={!canSubmit} size="lg" className="w-full mt-8 text-gr">
                {hasPassword ? 'Login' : 'Continue'} {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>
    
      <p className="font-[400] text-[12px] text-[#8E8E93] leading-[16px] mt-[12px] text-center">
        Not registered yet? Sign up now to connect withcc top talent effortlessly!{' '}
       <Link
          href="/company-auth/sign-up"
          className="text-[#007AFF] cursor-pointer"
        >
          Sign up as a company
        </Link>
      </p>
      {/* )} */}
    </div>
  )
}
