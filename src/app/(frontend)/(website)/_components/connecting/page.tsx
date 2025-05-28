import React from 'react'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'

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

export default function Connecting() {
  return (
    <div className='bg-[#EFFEFC] py-[100px] '>
   <div className='flex flex-col gap-y-6 px-16'>
         <h6 className={`border-solid border-[1px] border-[#53F5EC] py-[6px] px-[12px] ${jost.className} font-[500] text-[16px] leading-[1.5] text-[#1E2763] rounded-[100px] text-center w-[150px] mx-auto`}>Our Mission</h6>
      <h2 className={`text-[#292929] text-[3rem] leading-[1.5] font-[700] text-center w-[800px] mx-auto`}>Connecting Talent with Opportunity</h2>
      <p className={`font-normal leading-[1.5] text-xl ${jost.className} w-[700px] text-center mx-auto`}>At Intrn, we aim to bridge the gap between aspiring professionals and valuable internship opportunities. Backed by Koonage Infotech, we are dedicated to empowering Nigeria's youth through real-world experiences.</p>
   </div>
      <Image src="/images/painter.jpg" alt="Painter" width={2000} height={400} className='w-[100%] py-20'/>
     <div className='flex gap-x-5 justify-center px-16'>
         <a href="/companies" className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className}`}>Signup As a Company</a>
      <a href="#" className={`bg-[#53F5EC] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal leading-[1.5] ${jost.className}`}>Talent Signup</a>
     </div>
    </div>
  )
}
