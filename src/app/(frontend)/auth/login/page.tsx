'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasPassword, setHasPassword] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/student',
      col: 'students',
    })

    console.log(result)

    if (!result?.error) return

    console.log('Invalid credentials, please try again')
  }

  return (
    <div className="flex bg-[url(/images/auth-bg.png)] bg-right">
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

          <Label>Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Matric Number"
            className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5"
          />
          {hasPassword && (
            <>
              <Label className="mt-3 block">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
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
            onClick={(e) => (hasPassword ? handleSignIn(e) : setHasPassword((prev) => !prev))}
          >
            {hasPassword ? 'Login' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  )
}
