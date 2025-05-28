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
    <div className="px-16 py-[100px] flex items-center">
      <div className="flex-1">
        <div className="flex flex-col gap-y-8">
          <h2 className={`${schibstedGrotesk.className} font-[700] text-[48px] leading-[1.5]`}>
            Empower Your Business: Connect with Talented Interns Today!
          </h2>
          <p className={`${jost.className} text-xl leading-[1.5] font-normal  w-[616px]`}>
            Join Intrn and discover a pool of motivated student talents eager to contribute to your
            organization. Partner with us to shape the future of the workforce.
          </p>
          <div className={`${jost.className} text-xl leading-[1.5] font-normal`}>
            <div className={`flex gap-x-4 pb-4`}>
              <Image
                src="/icons/arrow.svg"
                alt=""
                width={16}
                height={16}
                className="w-[16px] h-[16px]"
              />
              <p>Find driven interns ready to make impact.</p>{' '}
            </div>
            <div className="flex gap-x-4 pb-4">
              <Image
                src="/icons/arrow.svg"
                alt=""
                width={16}
                height={16}
                className="w-[16px] h-[16px]"
              />
              <p>Unlock fresh perspectives for your business today.</p>
            </div>
            <div className="flex gap-x-4">
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
            href="/companies"
            className={`bg-[#1E2763] py-3 px-5 rounded-[100px] text-white  text-xl font-normal leading-[1.5] ${jost.className} w-[22%] text-center`}
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
