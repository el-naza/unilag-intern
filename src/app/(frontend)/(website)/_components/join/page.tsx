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

export default function Join({ headingText, normalText }) {
  return (
    <div className="bg-gradient-to-r from-[#1E2763] to-[#3D4FC9] ">
      <div className="py-[100px] px-20 flex flex-col gap-y-8 w-[50%]">
        <h2
          className={`text-white text-[3rem] leading-[1.5] font-[700] ${schibstedGrotesk.className}`}
        >
          {headingText}
        </h2>
        <p className={`font-normal leading-[1.5] text-xl ${jost.className} text-white`}>
          {normalText}
        </p>
        <a
          href="#"
          className={`bg-[#07CBC9] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal leading-[1.5] ${jost.className} w-[155px] text-center`}
        >
          Signup Now
        </a>
      </div>
    </div>
  )
}
