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

export default function Empower() {
  return (
    <div className="md:px-16 px-5 py-[100px] md:flex items-center text-[#292929]">
      <div className="flex-1">
        <div className="flex flex-col gap-y-8">
          <h2
            className={`${schibstedGrotesk.className} font-[700] md:text-[48px] text-[2rem] leading-[1.5] `}
          >
            Empower Your Business: Connect with Talented Interns Today!
          </h2>
          <p className={`${jost.className} text-xl leading-[1.5] font-normal  md:w-[616px]`}>
            Join Intrn and discover a pool of motivated student talents eager to contribute to your
            organization. Partner with us to shape the future of the workforce.
          </p>
          <div className={`${jost.className} text-xl leading-[1.5] font-normal`}>
            <div className={`flex gap-x-4 pb-4 items-center`}>
              <Image
                src="/icons/arrow.svg"
                alt=""
                width={16}
                height={16}
                className="w-[16px] h-[16px]"
              />
              <p>Find driven interns ready to make impact.</p>{' '}
            </div>
            <div className="flex gap-x-4 pb-4 items-center">
              <Image
                src="/icons/arrow.svg"
                alt=""
                width={16}
                height={16}
                className="w-[16px] h-[16px]"
              />
              <p>Unlock fresh perspectives for your business today.</p>
            </div>
            <div className="flex gap-x-4 items-center">
              <Image
                src="/icons/arrow.svg"
                alt=""
                width={16}
                height={16}
                className="w-[16px] h-[16px]"
              />
              <p>Join us in nurturing the next generation of professionals.</p>
            </div>
          </div>
          <a
            href="/company-auth/login"
            className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className} md:w-[30%] w-[100%] text-center mb-8 md:mb-0`}
          >
            Company Signup
          </a>
        </div>
      </div>
      <div className="flex-1">
        <Image
          src="/images/building.png"
          alt="Building"
          width={616}
          height={640}
          className="w-[100%]"
        />
      </div>
    </div>
  )
}
