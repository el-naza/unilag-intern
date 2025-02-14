'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { MessageSquareText } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import AssignCompany from './assign-company'
import { useParams } from 'next/navigation'

export default function StudentDetailPage() {
  const { id }: { id: string } = useParams()
  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-semibold text-[1.5rem]">Student Profile</h1>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-between mt-4 p-8 w-full mb-8  bg-[url(/images/profile-bg.png)] bg-cover bg-no-repeat bg-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>

          <div>
            <h3 className="font-semibold text-[1.2rem] text-white">Melinda Fowoshere</h3>
            <p className="text-sm text-white">Mathematics</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gray-light-2 text-black-2">Assigned Siwes</Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Assign Company</DialogTitle>
              <DialogDescription>Assign company to a student</DialogDescription>
            </DialogHeader>

            <AssignCompany />
          </DialogContent>
        </Dialog>
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

          <div className="relative">
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

        {!selectedFile && (
          <div className="mt-4">
            <Input
              type="file"
              onChange={selectFile}
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF] w-fit"
            />
          </div>
        )}

        {selectedFile && <p>{selectedFile.name}</p>}

        <h3 className="font-medium text-[1.2rem] mt-8">Siwes Reports</h3>
        <p className="text-sm">All supervisors reports</p>

        <div className="mt-4">
          <div className="flex gap-4 border-[1px] border-gray-light-2 rounded-[8px] p-4">
            <div className="p-3 rounded-full grid place-content-center bg-primary text-white w-[40px] h-[40px]">
              <MessageSquareText></MessageSquareText>
            </div>
            <div>
              <h4 className="font-medium">Report 001</h4>
              <p className="text-gray-dark-3">By Fredrick Precious 02/03/2023</p>

              <div className="mt-3">
                <p className="text-primary">Message</p>
                <p className="text-gray-dark-3">Student is doing well</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
