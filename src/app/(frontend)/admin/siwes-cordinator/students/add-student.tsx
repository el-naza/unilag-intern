import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const AddStudent = () => {
  return (
    <div>
        <h1 className='text-[2rem] font-bold text-center'>Add Student</h1>
        <p className='text-neutral-500 text-center mb-8'>Upload file with student information to add a list</p>

        <div className='border-[1px] border-dashed border-primary rounded-lg py-8 grid place-content-center text-center gap-4'>
            <Image src="/icons/upload.svg" width={50} height={40} alt='Upload Icon' className='mx-auto' />
            <p>Drag your file(s) to start uploading</p>
            <p className='text-neutral-500'>OR</p>
            <Button variant='outline'>Browse files</Button>
        </div>
        <p className='text-neutral-500'>Only support .jpg, .png, and svg files (2mb below)</p>

        <div className='flex gap-4 mt-8'>
            <Button>Update Student List</Button>
            <Button variant='outline'>Cancel</Button>
        </div>
    </div>
  )
}

export default AddStudent