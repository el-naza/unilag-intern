import React from 'react'
import { Jost, Schibsted_Grotesk } from 'next/font/google'
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

export default function AboutUs() {
  return (
    <div className="">
      <div className="py-5">
        <h1
          className={`${schibstedGrotesk} font-[700] leading-[1.5] text-[3rem] text-center text-white bg-gradient-to-r from-[#1E2763] to-[#3D4FC9] py-16`}
        >
          About Us
        </h1>
      </div>
      <div className="py-16">
        <p
          className={`text-[#525252] leading-[1.5] font-[500] text-xl ${jost.className} w-[850px] text-justify mx-auto`}
        >
          Intrn is a purpose-driven platform by Koonage Infotech, built to bridge the gap between
          ambitious young talents and real-world experience. We help students, recent graduates, and
          career starters across Nigeria discover internship opportunities that align with their
          aspirations — directly from verified companies and industries. <br />
          <br />
          xhBorn out of a passion for empowering the next generation, Intrn is more than a job board
          — it&apos;s a career springboard. With the backing of Koonage&apos;s technology and
          community-centered vision, we&apos;re redefining how internships are found, applied for,
          and secured.
        </p>
      </div>
    </div>
  )
}
