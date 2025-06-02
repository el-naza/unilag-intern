'use client'

import { useState } from 'react'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'

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

export default function Faq({ question, answer }) {
  const [displayText, setDisplayText] = useState(false)

  function handleClick() {
    setDisplayText(!displayText)
  }

  return (
    <div>
      <div className="bg-[#DCDCDC] h-[1px]"></div>
      <div className={`py-6 ${jost.className} cursor-pointer`}>
        <div className={` flex justify-between`} onClick={handleClick}>
          <h6 className={`font-[700] text-[#1E2763] leading-[1.5] text-xl`}>{question}</h6>
          <Image
            src="/icons/upArrow.png"
            alt="Up Arrow"
            width={32}
            height={32}
            className={` ${!displayText && 'rotate-180'}`}
          />
        </div>
        <p
          className={`text-xl font-normal leading-[1.5] pt-[21px] text-[#525252] portrait:text-justify ${displayText ? 'block' : 'hidden'}`}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}
