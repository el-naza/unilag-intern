'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  return (
    <div className="px-4 text-white pt-24">
      <div className=" text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-3">Set Password</h2>
        <div className="text-[12px] text-gray-light-2 leading-[16.5px] mb-8">
          Set a new password to proceed.
        </div>
      </div>

      <Label>New Password</Label>
      <Input
        placeholder="Enter Password"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5"
      />
      <Label className="mt-3 block">Re-enter New Password</Label>
      <Input
        placeholder="Enter Password"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1"
      />

      <Button size="lg" className="w-full mt-8 text-gr">
        Confirm
      </Button>
    </div>
  )
}
