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
    <div className="">
      <div className=" md:pt-[100px] pt-16 pb-16 px-5 md:px-0">
        <h1
          className={`${schibstedGrotesk.className} md:text-[85px] font-[900] text-center max-w-[1000px] mx-auto leading-[1.5] text-[2.5rem] text-[#292929]`}
        >
          Launch Your Career with Intrn Today!
        </h1>
        <p
          className={`${jost.className} text-xl text-center max-w-[650px] mx-auto leading-[1.5] text-[#525252]`}
        >
          Discover exciting internship opportunities tailored for you. Join intrn and take the first
          step towards your dream career!
        </p>
        <div className="gap-y-4 md:flex md:flex-row md:gap-x-4 md:justify-center flex flex-col pt-8">
          <a
            href="/auth/sign-up/siwes-applicant"
            className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className} text-center`}
          >
            Join as Intern
          </a>
          <a
            href="/company-auth/login"
            className={`bg-[#53F5EC] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal leading-[1.5] ${jost.className} text-center`}
          >
            Companies - Reserve a Spot
          </a>
        </div>
      </div>
      <Carousel />
      <div className="md:flex md:justify-between md:items-center md:gap-x-32 md:px-16 px-5 py-10 bg-[#EFFEFC] items-center">
        <p
          className={`${jost.className} text-xl leading-[1.5] w-[250px] py-auto text-[#1E2763] pb-8 md:pb-0`}
        >
          Trusted by top companies for internships
        </p>
        <div className="md:flex md:gap-x-8 md:items-center grid grid-cols-2 gap-8">
          <Image
            src="/images/koonageLogo.png"
            alt="The logo of Koonage"
            width={134}
            height={32}
            className="w-[134px] h-[32px]"
          />
          <Image
            src="/images/unilag-full-logo.png"
            alt="The logo of UNILAG"
            width={176}
            height={44}
            className="w-[176px] h-[44px]"
          />
          <Image
            src="/images/rccLogo.png"
            alt="The logo of RCC"
            width={100}
            height={52}
            className="w-[100px] h-[52px] "
          />
          <Image
            src="/images/ksgLogo.png"
            alt="The logo of Kogi State Government"
            width={164}
            height={44}
            className="w-[164px] h-[44px] "
          />
          <Image
            src="/images/setracoLogo.png"
            alt="The logo of Setraco"
            width={77}
            height={40}
            className="w-[77px] h-[40px] "
          />
          <Image
            src="/images/treeHouse.png"
            alt="The logo of Treehouse"
            width={137.7}
            height={32}
            className="w-[137.7px] h-[32px] "
          />
        </div>
      </div>
    </div>
  )
}
