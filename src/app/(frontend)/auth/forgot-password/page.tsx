'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="px-4 text-white pt-11">
      <div className="text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-3">Forgotten Password</h2>
        <div className="text-[12px] text-gray-light-2 leading-[16.5px] mb-8">
          Enter your matriculation number, and we&apos;ll send an OTP to the associated email
          address for you to change your password.
        </div>
      </div>

      <Label>Username</Label>
      <Input
        placeholder="Matric Number"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5"
      />

      <Button
        size="lg"
        className="w-full mt-8 text-gr"
        onClick={() => router.push('/auth/otp-confirmation')}
      >
        Send Link
      </Button>
    </div>
  )
}
