'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import React from 'react'

export default function StudentDetailPage() {
  const { id }: { id: string } = useParams()

  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')

  return (
    <div className="p-8">
      <h1 className="font-semibold text-[1.5rem]">Student Profile</h1>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-between mt-4 p-8 w-full mb-8 bg-primary">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>

          <div>
            <h3 className="font-semibold text-[1.2rem]">Melinda Fowoshere</h3>
            <p className="text-sm">Mathematics</p>
          </div>
        </div>

        <Button className="bg-gray-light-2 text-black-2">Assigned Siwes</Button>
      </div>

      <div>
        <h3 className="font-medium text-[1.2rem]">Basic Information</h3>
        <p className="text-sm">Student Basic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">First Name</Label>
            <Input
              placeholder="Enter First Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Last Name</Label>
            <Input
              placeholder="Enter Last Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Middle Name</Label>
            <Input
              placeholder="Enter Middle Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Email</Label>
            <Input
              placeholder="Enter Email"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Phone</Label>
            <Input
              placeholder="Enter Phone"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block"> Location</Label>
            <Input
              placeholder="Enter Location"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem]">Academic Information</h3>
        <p className="text-sm">Student Academic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">CGPA</Label>
            <Input
              placeholder="Enter CGPA"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Department</Label>
            <Input
              placeholder="Enter CDepartmentGPA"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem]">Siwes Form</h3>
        <p className="text-sm">Upload Student Siwes Form</p>

        <div className="mt-4">
          <Label htmlFor="picture">Picture</Label>
          <Input type="file" />
        </div>
      </div>
    </div>
  )
}
