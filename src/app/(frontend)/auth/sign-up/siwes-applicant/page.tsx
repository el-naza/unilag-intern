import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

import Link from 'next/link'

export default function Page() {
  return (
    <div className="text-gray-dark-2 min-h-screen py-24 px-4 bg-white">
      <div className=" text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-2 text-black-2">
          Sign up Login as a <br /> Siwes Applicant
        </h2>
        <div className="text-[12px] text-gray-light-1 leading-[16.5px] mb-8 px-6">
          Complete the form to proceed with the signup process.
        </div>
      </div>

      <Label>First Name</Label>
      <Input
        placeholder="Enter Name"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Last Name</Label>
      <Input
        placeholder="Enter Name"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Middle Name</Label>
      <Input
        placeholder="Enter Name"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Matriculation Number </Label>
      <Input
        placeholder="Enter Matric. Number"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Email</Label>
      <Input
        placeholder="Enter Email"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Date of Birth</Label>
      <Input
        placeholder="MM/DD/YYYY"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Nationality</Label>
      <Input
        placeholder="Select Nationality"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>State of Origin</Label>
      <Input
        placeholder="Select State of Origin"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Gender</Label>
      <Input
        placeholder="Select Gender"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Course of Study</Label>
      <Input
        placeholder="Select Course of Study"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Level</Label>
      <Input
        placeholder="300"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />
      <Label>Home Address</Label>
      <Input
        placeholder="Enter Address"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-2 border-gray-light-5 border-[1px] mb-3"
      />

      <Button
        size="lg"
        className="w-full mt-5"
        variant="secondary"
        // onClick={() => setHasPassword((prev) => !prev)}
      >
        Continue
      </Button>
    </div>
  )
}
