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
    <div className="bg-[#EFFEFC] py-[100px] ">
      <div className="flex flex-col gap-y-6 md:px-16 px-5">
        <h6
          className={`border-solid border-[1px] border-[#53F5EC] py-[6px] px-[12px] ${jost.className} font-[500] text-[16px] leading-[1.5] text-[#1E2763] rounded-[100px] text-center w-[150px] mx-auto`}
        >
          Our Mission
        </h6>
        <h2
          className={`${schibstedGrotesk.className} text-[#292929] md:text-[3rem] text-[2rem] leading-[1.5] font-[700] text-center md:w-[800px] mx-auto`}
        >
          Connecting Talent with Opportunity
        </h2>
        <p
          className={`font-normal leading-[1.5] text-xl ${jost.className} md:w-[700px] text-center mx-auto text-[#525252]`}
        >
          At Intrn, we aim to bridge the gap between aspiring professionals and valuable internship
          opportunities. Backed by Koonage Infotech, we are dedicated to empowering Nigeria's youth
          through real-world experiences.
        </p>
      </div>
      <Image
        src="/images/painter.jpg"
        alt="Painter"
        width={2000}
        height={400}
        className="w-[100%] py-20"
      />
      <div
        className="md:flex md:flex-row md:gap-x-5 md:justify-center md:px-16 px-5 flex flex-col gap-y-5 md:gap-y-0"
        id="signup"
      >
        <a
          href="https://app.intrn.com/signup/company"
          className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className} text-center`}
        >
          Signup As a Company
        </a>
        <a
          href="https://app.intrn.com/signup/student"
          className={`bg-[#53F5EC] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal leading-[1.5] ${jost.className} text-center`}
        >
          Talent Sign Up
        </a>
      </div>
    </div>
  )
}
