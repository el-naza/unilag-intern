import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import './avatar-group.scss'

const AvatarGroup = () => {
  return (
    <div className='flex gap-4 items-center rounded-full px-[10px] py-[5px] bg-[#FAFAFA] w-fit'>
       <div className='avatar-groups'>
        <Avatar className='lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]'>
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>O</AvatarFallback>
        </Avatar>
        <Avatar className='lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]'>
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>O</AvatarFallback>
        </Avatar>
        <Avatar className='lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]'>
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>O</AvatarFallback>
        </Avatar>
        <Avatar className='lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]'>
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>O</AvatarFallback>
        </Avatar>
        <Avatar className='lg:w-[30px] lg:h-[30px] sm:w-[25px] sm:h-[25px]'>
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>O</AvatarFallback>
        </Avatar>
       </div>
            
        <p className='font-medium lg:text[1rem] sm:text-[.8rem]'>+ 11 students </p>
    </div>
  )
}

export default AvatarGroup