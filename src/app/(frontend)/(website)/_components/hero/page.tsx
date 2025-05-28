import React from 'react'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'
import Carousel from '../carousel/carousel'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500'], 
  variable: '--font-jost',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-schibstedGrotesk',
})


export default function Hero() {
  return (
    <div className=''>
      <div className=' pt-[100px] pb-16'>
        <h1 className={`${schibstedGrotesk.className} text-[85px] font-[900] text-center max-w-[1000px] mx-auto leading-[1.5]`}>Launch Your Career with Intrn Today!</h1>
      <p className={`${jost.className} text-xl text-center max-w-[650px] mx-auto leading-[1.5]`}>Discover exciting internship opportunities tailored for you. Join intrn and take the first step towards your dream career!</p>
     <div className='flex gap-x-4 justify-center pt-8'>
  <a href="/schoolPortals" className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className}`}>Join as Intern</a>
      <a href="/companies" className={`bg-[#53F5EC] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal leading-[1.5] ${jost.className}`}>For Companies - Reserve a Spot</a>
     </div>
      </div>
<Carousel />
     <div className='flex justify-between gap-x-32 px-16 py-5 bg-[#EFFEFC] items-center'>
        <p className={`${jost.className} text-xl leading-[1.5] w-[250px] text-[#1E2763]`}>Trusted by top companies for internships</p>
        <div className='flex gap-x-8'>
          <Image src="/images/koonageLogo.png" alt="The logo of Koonage" width={134} height={32} className='w-[134px] h-[32px]'/>
        <Image src="/images/unilagLogo.png" alt="The logo of UNILAG" width={176} height={44} className='w-[176px] h-[44px]'/>
        <Image src="/images/rccLogo.png" alt="The logo of RCC" width={100} height={52} className='w-[100px] h-[52px] '/>
        <Image src="/images/ksgLogo.png" alt="The logo of Kogi State Government" width={164} height={44} className='w-[164px] h-[44px] '/>
        <Image src="/images/setracoLogo.png" alt="The logo of Setraco" width={77} height={40} className='w-[77px] h-[40px] '/>
        <Image src="/images/treeHouse.png" alt="The logo of Treehouse" width={137.7} height={32} className='w-[137.7px] h-[32px] '/>
        </div>
     </div>
    </div>
  )
}
