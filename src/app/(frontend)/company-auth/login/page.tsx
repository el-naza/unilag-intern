'use client'
import { useState } from 'react'
import MailIcon from '../../assets/icons/mail'
import DynamicForm from '../../components/Form'

export default function Login() {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [email, setEmail] = useState('')
  const [rcNumber, setRCNumber] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [otp, setOtp] = useState('')
  const [area, setArea] = useState('')
  const [step, setStep] = useState<
    'company' | 'showEmail' | 'showOTP' | 'showSignUp' | 'showUpload'
  >('company')

  const [signUp, setSignUp] = useState(false)

  const handleLogin = () => {
    const newErrors: { [key: string]: string } = {}
    if (!companyName) newErrors.companyName = 'Company name is required.'
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      switch (step) {
        case 'company':
          if (!companyName) {
            setErrors({ companyName: 'Company name is required.' })
          } else {
            setErrors({})
            setStep('showEmail') // Proceed to the next step
          }
          break

        case 'showEmail':
          if (!email) {
            setErrors({ email: 'Email is required.' })
          } else {
            setErrors({})
            setStep('showOTP') // Proceed to the next step
          }
          break

        case 'showOTP':
          if (!otp) {
            setErrors({ otp: 'OTP is required.' })
          } else {
            setErrors({})
            setStep('showSignUp') // Proceed to the next step
          }
          break

        default:
          console.log('Final step reached!')
      }
    }
  }

  // const handleSignUp = () => {
  //   const newErrors: { [key: string]: string } = {}
  //   if (Object.keys(newErrors).length === 0) {
  //     // Submit form
  //     switch (step) {
  //       case 'signup':
  //         if (!companyName) {
  //           setErrors({ companyName: 'Company name is required.' })
  //         } else {
  //           setErrors({})
  //           setStep('signUp') // Proceed to the next step
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

  //       default:
  //         console.log('Final step reached!')
  //     }
  //   }
  // }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(`${e.target.name}: ${e.target.value}`)
  }

  const companyField = [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      value: companyName,
      placeholder: 'Enter Company Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value),
      error: errors.companyName,
      message: errors.companyName,
    },

    {
      // name: 'companyName',
      type: 'file',
    },
    // {
    //   name: 'role',
    //   label: 'Role',
    //   type: 'select',
    //   value: role,
    //   options: [
    //     { label: 'Select Role', value: '' },
    //     { label: 'Admin', value: 'admin' },
    //     { label: 'User', value: 'user' },
    //   ],
    //   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value),
    //   error: '',
    //   // message: 'Role selected.',
    // },
  ]

  const emailField = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: email,
      placeholder: 'Enter Email',
      icon: <MailIcon fill={errors.companyName ? 'red' : '#0B7077'} />,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      error: errors.email,
      message: errors.email,
    },
  ]

  const signUpField = [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      value: companyName,
      placeholder: 'Enter Company Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value),
      error: errors.companyName,
      message: errors.companyName,
    },
    {
      name: 'companyEmail',
      label: 'Company Email',
      type: 'email',
      value: companyEmail,
      placeholder: 'Enter Email',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCompanyEmail(e.target.value),
      error: errors.companyEmail,
      message: errors.companyEmail,
    },
    {
      name: 'companyRCNumber',
      label: 'Company RC Number',
      type: 'number',
      value: rcNumber,
      placeholder: 'Enter RC Number ',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRCNumber(e.target.value),
      error: errors.companyRCNumber,
      message: errors.companyRCNumber,
    },
    {
      name: 'courseArea',
      label: 'Company Course Area',
      type: 'select',
      value: area,
      options: [
        { label: 'Select Area', value: '' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setArea(e.target.value),
      error: '',
      // message: 'Role selected.',
    },
    {
      name: 'companyAddress',
      label: 'Company Address',
      type: 'text',
      value: address,
      placeholder: 'Enter Address ',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value),
      error: errors.companyAddress,
      message: errors.companyAddress,
    },
  ]
  const otpField = [
    {
      name: 'otp',
      label: 'Enter OTP',
      type: 'otp',
      otpLength: 6,
      onChange: handleFieldChange,
    },
  ]

  const fields =
    step === 'company'
      ? companyField
      : step === 'showEmail'
        ? emailField
        : step === 'showOTP'
          ? otpField
          : []

  return (
    <div className="">
      <h2 className="font-[500] text-[24px] text-center">Login into your Siwes Company Profile</h2>
      <p className="text-center text-[#8E8E93] font-[400] text-[14px] mt-8 mb-[40px]">
        {/* {success
          ? 'Complete this email address ex…………56@gmail.com and we’ll send you an OTP for confirmation.' */}
        {/* : ' */}
        Enter your company name to proceed with the login process
        {/* '} */}
      </p>

      <DynamicForm
        fields={signUp ? signUpField : fields}
        onSubmit={handleLogin}
        submitButtonText="Proceed"
      />

      {/* {success ? (
        <p className="font-[400] text-[12px] text-[#8E8E93] leading-[16px] mt-[12px] text-center">
          Can’t remember your email address? Contact our customer service at 090 0000 1123{' '}
          <span className="text-[#007AFF]">090 0000 1123</span> for assistance.{' '}
        </p>
      ) : ( */}
      <p className="font-[400] text-[12px] text-[#8E8E93] leading-[16px] mt-[12px] text-center">
        Not registered yet? Sign up now to connect with top talent effortlessly!{' '}
        <span className="text-[#007AFF] cursor-pointer" onClick={() => setSignUp(true)}>
          Sign up as a company
        </span>
      </p>
      {/* )} */}
    </div>
  )
}
