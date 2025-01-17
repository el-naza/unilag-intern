import { Button } from '@/components/ui/button'

import Link from 'next/link'

export default function Page() {
  return (
    <div className="text-white min-h-screen flex flex-col justify-between py-32 gap-32">
      <div className="px-4">
        <h1 className="text-[38px] leading-[50.4px] font-semibold mb-3">
          Your Gateway to <br /> Opportunities
        </h1>
        <div className="text-base leading-6">
          Log in and stay connected to companies that matter.
        </div>
      </div>

      <div className="px-[30px] text-center text-sm leading-6">
        <Link href="/auth/login">
          <Button size="lg" className="bg-white hover:bg-white/90 text-black-1 w-full mb-3">
            Login as a Siwes Applicant
          </Button>
        </Link>
        <Link href="/auth/login-as-lecturer">
          <Button size="lg" className="w-full mb-10">
            Login as a Lecturer
          </Button>
        </Link>
        <div className="text-[12px] text-gray-light-2 leading-[16.5px]">
          Not a Registered Siwes Applicant? &nbsp;
          <Link href="/auth/sign-up" className="text-accent-orange hover:underline">
            Sign up instead
          </Link>
        </div>
      </div>
    </div>
  )
}
