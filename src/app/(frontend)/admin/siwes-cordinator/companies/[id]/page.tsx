'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { Textarea } from "@/components/ui/textarea"
import React from 'react'


export default function CompanyDetailPage({ params }: { params: { id: string } }) {
     const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')
     
  return (
    <div className='p-8'>
        <h1 className="font-semibold text-[1.5rem]">Company Profile</h1>
        <p>{formattedDate}</p>

        <div className='flex items-center justify-between mt-4 p-8 w-full mb-8 bg-primary'>
            <div className='flex items-center gap-4'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                </Avatar>

                <div>
                    <h3 className='font-semibold text-[1.2rem]'>Shopping Mall</h3>
                    <p className='text-sm'>I6364876736</p>
                </div>
            </div>

            <Button className='bg-gray-light-2 text-black-2'>Assigned Student</Button>
        </div>

        <div>
            <h3 className='font-medium text-[1.2rem]'>Company Information</h3>
            <p className='text-sm'>Company Basic Information</p>


            <div className='grid grid-cols-3 gap-4 mb-8 mt-4'>
                <div>
                    <Label className="mt-3 block">Company Name</Label>
                    <Input
                        placeholder="Enter Company Name"
                        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                </div>

                <div>
                    <Label className="mt-3 block">CAC Number</Label>
                    <Input
                        placeholder="Enter CAC Number"
                        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                </div>

                <div>
                    <Label className="mt-3 block">Location</Label>
                    <Input
                        placeholder="Enter Location"
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
                    <Label className="mt-3 block">Website</Label>
                    <Input
                        placeholder="Enter Website"
                        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                </div>
            </div>

            <Label className="mt-3 block">Description</Label>
            <Textarea placeholder="Type your message here." />


            <h3 className='font-medium text-[1.2rem]'>Siwes Reports</h3>
            <p className='text-sm'>All supervisors reports</p>

            <div className="mt-4">
               
            </div>
        </div>
    </div>
  )
}
