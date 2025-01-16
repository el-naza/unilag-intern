'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  const [hasPassword, setHasPassword] = useState(false)

  return (
    <div className="px-4 text-white pt-24">
      <div className=" text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-3">Login as a Siwes Applicant</h2>
        <div className="text-[12px] text-gray-light-2 leading-[16.5px] mb-8">
          {hasPassword
            ? 'Please enter your password to proceed.'
            : 'Enter your matriculation number to continue'}
        </div>
      </div>

      <Label>Username</Label>
      <Input
        placeholder="Matric Number"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5"
      />
      {hasPassword && (
        <>
          <Label className="mt-3 block">Password</Label>
          <Input
            placeholder="Enter Password"
            className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1"
            type="password"
          />
          <Link
            href="/auth/forgot-password"
            className="text-accent-teal underline text-[12px] leading-[16.5px]"
          >
            Forgotten Password
          </Link>
        </>
      )}

      <Button
        size="lg"
        className="w-full mt-8 text-gr"
        onClick={() => setHasPassword((prev) => !prev)}
      >
        {hasPassword ? 'Login' : 'Confirm'}
      </Button>
    </div>
  )
}
