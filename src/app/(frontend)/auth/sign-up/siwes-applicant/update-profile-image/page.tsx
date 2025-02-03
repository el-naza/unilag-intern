'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [showInstructions, setShowInstruction] = useState(false)

  return (
    <div className="text-gray-dark-2 min-h-screen lg:min-h-full py-11 px-4 bg-white flex flex-col">
      <div className="text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-2 text-black-2">
          Upload Profile Image
        </h2>
        <div className="text-[12px] text-gray-dark leading-[16.5px] mb-8 px-6">
          Complete the form to proceed with the signup process.
        </div>
      </div>

      <Button
        variant={'ghost'}
        className="p-[1.5px] h-auto self-end"
        onClick={() => setShowInstruction(true)}
      >
        <Image src="/static-icons/info-icon.svg" width={16} height={16} alt="icon" />
      </Button>
      <div className="border-dashed border-secondary/50 border-[2px] rounded-lg flex flex-col items-center py-6 mt-3">
        <Image src="/static-icons/upload-icon.svg" width={42} height={42} alt="icon" />
        <div className="mt-3 mb-2 text-black-2 text-[12px]">
          Drag your file(s) to start uploading
        </div>
        <div className="text-[12px] text-gray-dark leading-[18px] mb-2 flex items-center w-[200px] gap-2">
          <div className="h-[1px] w-full bg-gray-light-2" />
          OR
          <div className="h-[1px] w-full bg-gray-light-2" />
        </div>
        <Button variant="outline" size="sm">
          Browse files
        </Button>
      </div>
      <div className="text-[12px] text-gray-dark leading-[16.5px] mb-8 mt-3">
        Only support .jpg, .png and .svg and zip files (5mb below)
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={() => router.push('/auth/sign-up/siwes-applicant/profile-preview')}
      >
        Proceed to Log in
      </Button>

      {showInstructions && (
        <div
          className="fixed bottom-0 top-0 left-0 right-0 bg-black/20 flex items-end"
          onClick={() => setShowInstruction(false)}
        >
          <Image
            className="w-full"
            src="/images/upload-instructions.svg"
            width={402}
            height={492}
            alt={`Photo Instruction

Instructions
Use a plain, light-colored background.
Ensure your face is fully visible and centered.
Avoid hats, sunglasses, or accessories (unless for religious/medical reasons).
Maintain a neutral expression with clear lighting.
Upload a clear, recent photo (Max size: 5MB, JPEG/PNG format).`}
          />
        </div>
      )}
    </div>
  )
}
