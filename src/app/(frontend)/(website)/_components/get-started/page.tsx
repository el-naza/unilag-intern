import React from 'react'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jost',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-schibstedGrotesk',
})

export default function GetStarted() {
  return (
    <div className="md:flex md:px-16 px-5 py-[100px] gap-x-20">
      <div className="md:w-[50%]">
        <h2
          className={`font-[700] ${schibstedGrotesk.className} md:text-[3rem] text-[2rem] md:text-left text-center leading-[1.5] text-[#292929]`}
        >
          How to Get Started with Intrn
        </h2>
        <p className={`${jost.className} font-normal md:pb-0 pb-6 pt-6 text-[#525252] text-xl`}>
          Embarking on your <span className="text-[#4172F0]">internship</span> journey is easy!
          Follow these simple steps to connect with amazing{' '}
          <span className="text-[#4172F0]">opportunities.</span>
        </p>
      </div>
      <div>
        <div className="pb-8">
          <h3
            className={`${schibstedGrotesk.className} font-[700] md:text-[32px] text-[1.5rem] leading-[1.3] text-[#292929]`}
          >
            1. Start your journey by signing up on the platform
          </h3>
          <p className={`text-[#525252] ${jost.className} text-xl leading-[1.5] font-normal pt-6`}>
            Set up your personal account using your email or school ID. This will give you access to
            exclusive internship listings from top companies across Nigeria.
          </p>
        </div>
        <div className="bg-[#DCDCDC] h-[1px]"></div>
        <div className="py-8">
          <h3
            className={`${schibstedGrotesk.className} font-[700]md:text-[32px] text-[1.5rem]  leading-[1.3] text-[#292929]`}
          >
            2. Let companies get to know you.
          </h3>
          <p className={`text-[#525252] ${jost.className} text-xl leading-[1.5] font-normal pt-6`}>
            A complete and polished profile increases your chances of being shortlisted and matched
            with the right internship opportunities.
          </p>
        </div>
        <div className="bg-[#DCDCDC] h-[1px]"></div>
        <div className="py-8">
          <h3
            className={`${schibstedGrotesk.className} font-[700] md:text-[32px] text-[1.5rem] leading-[1.3] text-[#292929]`}
          >
            3. Explore available positions and apply with confidence
          </h3>
          <p className={`text-[#525252] ${jost.className} text-xl leading-[1.5] font-normal pt-6`}>
            Browse internships based on your preferred field, location, or duration. Once you find
            the right fit, submit your application directly through the platform. You&#39;ll also
            get updates and interview invitations right in your dashboard.
          </p>
        </div>
        <div className="bg-[#DCDCDC] h-[1px]"></div>
      </div>
    </div>
  )
}
