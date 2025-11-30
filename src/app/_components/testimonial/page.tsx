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

export default function Testimonial() {
  return (
    <div className="bg-[#53F5EC] md:p-[64px] p-5 md:flex md:flex-row items-center justify-between md:gap-x-[80px] flex flex-col gap-y-5">
      <div className="flex-1 relative group">
        <video src="/videos/video-2.mp4" className="" controls></video>
        <div className="bg-[rgba(57,57,57,0.4)] py-6 px-3 absolute bottom-[0px] z-10 w-[100%] duration-300 ease-in group-hover:hidden">
          <p className={`text-xl font-[700] ${jost.className} leading-[1.5] text-white`}>
            Vivian Asogwa
          </p>
          <p className={`text-[16px] font-normal ${jost.className} leading-[1.5] text-white`}>
            Intern, Koonage
          </p>
        </div>
      </div>
      <div className="flex-1 md:w-[616px] md:text-left text-justify">
        <p
          className={`${schibstedGrotesk.className} font-[700] md:text-[32px] text-xl leading-[1.3] text-[#292929]`}
        >
          "My internship experience with Intrn opened doors I never thought possible. The guidance
          and opportunities were invaluable in shaping my career path."
        </p>
        <div className="flex gap-x-1 py-8">
          <Image
            src="/icons/star.svg"
            alt="Star"
            width={21}
            height={20}
            className="w-[21px] h-[20px]"
          />
          <Image
            src="/icons/star.svg"
            alt="Star"
            width={21}
            height={20}
            className="w-[21px] h-[20px]"
          />
          <Image
            src="/icons/star.svg"
            alt="Star"
            width={21}
            height={20}
            className="w-[21px] h-[20px]"
          />
          <Image
            src="/icons/star.svg"
            alt="Star"
            width={21}
            height={20}
            className="w-[21px] h-[20px]"
          />
          <Image
            src="/icons/star.svg"
            alt="Star"
            width={21}
            height={20}
            className="w-[21px] h-[20px]"
          />
        </div>
        <div className="flex gap-x-[20px] items-center">
          <Image
            src="/images/koonageLogo.png"
            alt="The logo of Koonage"
            width={133}
            height={32}
            className="w-[133px] h-[32px]"
          />
          <div className="bg-[#0B0B0026] w-[1px] h-[61px]"></div>
          <Image
            src="/images/logo.png"
            alt="The logo of Intrn"
            width={113}
            height={32}
            className="w-[113px] h-[32px]"
          />
        </div>
      </div>
    </div>
  )
}
