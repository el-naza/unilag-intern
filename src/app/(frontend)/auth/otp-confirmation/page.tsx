'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()

  return (
    <div className="px-4 text-white pt-11">
      <div className="text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-3">OTP Confirmations</h2>
        <div className="text-[12px] text-gray-light-2 leading-[16.5px] mb-8">
          An OTP has been sent to <span className="text-accent-orange">example@gmail.com</span>,
          Please check your inbox to retrieve it and proceed.
        </div>
      </div>

      <Label>Enter OTP</Label>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        size="lg"
        className="w-full mt-8 text-gr"
        onClick={() => router.push('/auth/set-password')}
      >
        Proceed
      </Button>
    </div>
  )
}
