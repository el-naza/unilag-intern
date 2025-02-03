'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="text-gray-dark-2 min-h-screen lg:min-h-full px-5 pb-16 bg-white flex flex-col">
      <div className="grid grid-cols-3 bg-white pb-5">
        <div className=" col-span-2 flex">
          <h2 className="m-auto lg:mx-0 text-xl text-center lg:text-left leading-[25.78px] font-medium text-black-2">
            Profile Preview
          </h2>
        </div>
        <Button
          variant="ghost"
          className="h-full text-base text-primary leading-6 flex items-center"
          onClick={() => router.push('/auth/sign-up/siwes-applicant')}
        >
          Edit
        </Button>
      </div>

      <Button
        variant="ghost"
        className="h-auto m-auto mb-8 mt-1 self-center"
        onClick={() => router.push('/auth/sign-up/siwes-applicant/update-profile-image')}
      >
        <Image src="/images/unilag-logo.png" width={64} height={64} alt="image" />
      </Button>

      <div className="px-1">
        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Full Name</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Enter Name</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">
          Matriculation Number
        </div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Enter Matric. Number</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Email</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Enter Email</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Date of Birth</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> MM/DD/YYYY</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Nationality</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Select Nationality</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">State of Origin</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Select State of Origin</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Gender</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Select Gender</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Course of Study</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Select Course of Study</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Level</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> 300</div>

        <div className="text-xs font-bold leading-[16.5px] font-manrope mb-1">Home Address</div>
        <div className="text-xs leading-[16.5px] text-gray-dark mb-3"> Enter Address</div>
      </div>

      <Button
        size="lg"
        className="w-full mt-5"
        variant="secondary"
        onClick={() => router.push('/auth/login')}
      >
        Proceed to Login
      </Button>
    </div>
  )
}
