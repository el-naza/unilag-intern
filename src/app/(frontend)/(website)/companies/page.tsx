import React from 'react'
import Image from 'next/image'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-jost',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-schibstedGrotesk',
})

export default function Companies() {
  return (
    <div className='pt-5 relative mb-[42.5rem]'>
     <Image src="/images/heroImage.jpg" alt="Two women" width={1440} height={500} className='w-[100%] object-contain pb-5'/>
     <div className=' px-20 absolute top-[38%] w-[100%]'>
        <div className='bg-white rounded-[12px] py-16'>
           <div className='flex flex-col gap-y-6'>
             <h3 className={`${schibstedGrotesk.className} text-[32px] leading-[1.3] text-center font-[700] text-[#4172F0]`}>Get Early Access to Top Intern Talent</h3>
            <p className={`${jost.className} text-xl leading-[1.5] text-center font-[500] text-[#525252] w-[40%] mx-auto`}>Join our company waitlist to connect with driven, pre-qualified interns across leading Nigerian institutions.</p>
            <p className={`${jost.className} text-[16px] leading-[1.5] font-[500] text-[##1E2763] bg-[#EFFEFC] border border-solid border-[#53F5EC] border-[1px] rounded-[100px] py-[6px] px-3 w-[200px] mx-auto text-center`}>Fill out your info below</p>
           </div>
     
        <form action="" className={`${jost.className} flex flex-col gap-y-[10px] pt-8 w-[35%] mx-auto`}>
            <input type="text" placeholder='Company Name' className='rounded-[8px] py-3 px-[15px] border border-solid border-[#DCDCDC] border-[1px] text-[#292929] leading-[1.5] font-normal text-[16px] focus:outline-none'/>
           <input type="text" placeholder='Company Email' className='rounded-[8px] py-3 px-[15px] border border-solid border-[#DCDCDC] border-[1px] text-[#292929] leading-[1.5] font-normal text-[16px] focus:outline-none'/>
           <input type="text" placeholder='Company RC Number' className='rounded-[8px] py-3 px-[15px] border border-solid border-[#DCDCDC] border-[1px] text-[#292929] leading-[1.5] font-normal text-[16px] focus:outline-none'/>
           <input type="text" placeholder='Company Course Area' className='rounded-[8px] py-3 px-[15px] border border-solid border-[#DCDCDC] border-[1px] text-[#292929] leading-[1.5] font-normal text-[16px] focus:outline-none'/>
           <input type="text" placeholder='Company Address' className='rounded-[8px] py-3 px-[15px] border border-solid border-[#DCDCDC] border-[1px] text-[#292929] leading-[1.5] font-normal text-[16px] focus:outline-none'/>

           <button className={`bg-[#1E2763] py-3 px-5 rounded-[12px] text-white  text-xl font-normal leading-[1.5] ${jost.className} text-center`}>Join the Waitlist</button>
        </form>
     </div>
     </div>
    </div>
  )
}
