import React, { useState, useRef } from 'react'

type OtpFieldProps = {
  name: string
  label: string
  type: string
  otpLength?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const OtpField = ({ field }: { field: OtpFieldProps }) => {
  const otpLength = field.otpLength || 6 // Default OTP length is 6
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''))
  const inputsRef = useRef<HTMLInputElement[]>([])

  const handleOTPChange = (
    value: string,
    index: number,
    otpFieldName: string,
    otpLength: number,
    setOtp: React.Dispatch<React.SetStateAction<string[]>>,
    inputsRef: React.RefObject<HTMLInputElement[]>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) => {
    // Only allow numeric values and one character
    if (!/^\d?$/.test(value)) return

    // Update the specific index in the OTP array
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp]
      updatedOtp[index] = value
      return updatedOtp
    })

    // Trigger onChange with combined value
    onChange({
      target: {
        name: otpFieldName,
        value: inputsRef.current?.map((el) => el?.value || '').join(''),
      },
    } as React.ChangeEvent<HTMLInputElement>)

    // Move focus to the next input
    if (value && index < otpLength - 1) {
      inputsRef.current?.[index + 1]?.focus()
    }
  }

  const handleOTPKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    setOtp: React.Dispatch<React.SetStateAction<string[]>>,
    inputsRef: React.RefObject<HTMLInputElement[]>,
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp]
        updatedOtp[index - 1] = '' // Clear the previous value
        return updatedOtp
      })
      inputsRef.current?.[index - 1]?.focus()
    }
  }

  return (
    <div className="w-full flex items-center justify-between">
      {Array.from({ length: otpLength }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={otp[idx]}
          onChange={(e) =>
            handleOTPChange(
              e.target.value,
              idx,
              field.name,
              otpLength,
              setOtp,
              inputsRef,
              field.onChange,
            )
          }
          onKeyDown={(e) => handleOTPKeyDown(e, idx, setOtp, inputsRef)}
          ref={(el) => {
            if (el) inputsRef.current[idx] = el
          }}
          className="w-10 h-10 text-center text-xl border border-[#B3FAFF] rounded focus:outline-none"
        />
      ))}
    </div>
  )
}

export default OtpField
