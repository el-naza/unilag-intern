import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'
import React from 'react'

const AddAdmin = () => {
  return (
    <div className='p-4'>

        <div className='w-[7rem] h-[7rem] rounded-full bg-gray-light-2 grid place-content-center mx-auto'>
            <User />
            
        </div>
        <p className='text-center mb-8'>Upload admin profile image</p>

      <div>
        <Label className="mt-3 block">Name</Label>
        <Input
          placeholder="Enter Name"
          className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
        />
      </div>

      <div>
        <Label className="mt-3 block">Email</Label>
        <Input
          type="email"
          placeholder="Enter Email"
          className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
        />
      </div>

      <div>
        <Label className="mt-3 block">Phone Number</Label>
        <Input
          placeholder="Enter Phone Number"
          className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
        />
      </div>

      <div>
        <Label className="mt-3 block">Role</Label>
        <Input
          placeholder="Enter Role"
          className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
        />
      </div>
      <div className="flex items-center justify-center gap-8 mt-8">
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}

export default AddAdmin
