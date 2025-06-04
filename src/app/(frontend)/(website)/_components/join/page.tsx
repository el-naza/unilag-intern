import React from 'react'
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

export default function Join({ headingText, normalText, signingLink }) {
  return (
    <div className="bg-gradient-to-r from-[#1E2763] to-[#3D4FC9] ">
      <div className="py-[100px] md:px-20 flex flex-col gap-y-8 md:w-[50%] w-[100%] px-5">
        <h2
          className={`text-white md:text-[3rem] text-[2rem] leading-[1.5] font-[700] ${schibstedGrotesk.className}`}
        >
          {headingText}
        </h2>
        <p className={`font-normal leading-[1.5] text-xl ${jost.className} text-white`}>
          {normalText}
        </p>
        <a
          href={signingLink}
          className={`bg-[#07CBC9] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal self-start leading-[1.5] ${jost.className} text-center`}
        >
          Sign Up Now
        </a>
      </div>
    </div>
  )
}
