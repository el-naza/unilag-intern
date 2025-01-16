import { Button } from '@/components/ui/button'
import Image from 'next/image'

import Link from 'next/link'

export default function Page() {
  return (
    <div className="text-gray-dark-3 min-h-screen flex flex-col justify-between py-24 gap-24 bg-white">
      <div className="px-4 flex flex-col items-center">
        <Image src="/images/unilag-logo.png" width={44} height={44} alt="LOGO" />
        <div className="text-[12px] text-black-2 font-bold leading-[16.5px] mt-1">Unilag Siwes</div>
        <h1 className="mt-11 text-xl leading-[25.78px] text-center text-secondary font-medium">
          Your Gateway to <br /> Opportunities
        </h1>
      </div>

      <div className="px-[30px] text-center text-sm leading-6">
        <div className="text-sm leading-[16.5px] text-gray-dark-3 mb-[58px]">
          Sign up and stay connected to companies that matter.
        </div>
        <Link href="/auth/sign-up/siwes-applicant">
          <Button size="lg" className="bg-gray-light-5 hover:bg-white/90 text-black-1 w-full mb-3">
            Sign up as a Siwes Applicant
          </Button>
        </Link>
        <Link href="/auth/sign-up-lecturer">
          <Button size="lg" className="w-full mb-10">
            Sign up as a Lecturer
          </Button>
        </Link>
        <div className="text-[12px] leading-[16.5px]">
          Already Registered? &nbsp;
          <Link href="/auth" className="text-accent-blue hover:underline">
            Login instead
          </Link>
        </div>
      </div>
    </div>
  )
}
