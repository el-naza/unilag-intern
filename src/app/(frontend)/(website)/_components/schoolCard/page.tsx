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

export default function SchoolCard({ id, schoolLogo, schoolName, motto, availability }) {
  return (
    <div className="flex flex-col gap-y-6 py-5 px-[15px] bg-[#F5F9FF] border-solid border-[1px] border-[#DCDCDC] rounded-[6px] relative">
      <Image
        src={schoolLogo + '.png'}
        alt={'The Logo of ' + schoolName}
        width={100}
        height={100}
        quality={100}
        className="w-16 h-16 object-contain "
      />
      <div className="flex flex-col gap-y-2">
        <p className={`text-[#292929] font-[700] text-xl leading-[1.5] ${jost.className}`}>
          {schoolName}
        </p>
        <p className={`text-[#525252] font-normal text-[16px] leading-[1.5] ${jost.className}`}>
          Motto: {motto}
        </p>
      </div>
      <a
        href="#"
        className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className} md:w-[30%] w-[50%] text-center`}
      >
        Go-to Portal
      </a>
      <Image
        src="/images/comingSoon.png"
        alt="Coming Soon"
        width={160}
        height={34}
        className={`absolute top-0 right-0 ${availability ? 'hidden' : ''}`}
      />
    </div>
  )
}
