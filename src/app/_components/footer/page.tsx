import React from 'react'
import Image from 'next/image'
import { Jost } from 'next/font/google'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jost',
})

export default function Footer() {
  return (
    <div className="md:flex md:justify-between items-center py-[51px] px-16 md:flex-row flex flex-col gap-y-6 text-center md:text-left">
      <a href="/">
        {' '}
        <Image src="/images/logo.png" alt="Logo of Intrns" width={71} height={20} />
      </a>
      <div
        className={`md:flex gap-x-6 ${jost.className} text-xl font-normal leading-[1.5] pt-[21px] md:pt-0 md:flex-row flex flex-col gap-y-6 md:gap-y-0`}
      >
        <p className="#0B0B00">&copy; 2025 intrns.com All rights reserved.</p>
        {/* <ul
          className={`md:flex md:gap-x-6 md:flex-row flex flex-col gap-y-6 text-[#1E2763] underline hidden`}
        > */}
        <ul className={`hidden`}>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Cookie Policy</a>
          </li>
        </ul>
      </div>
      <div className="flex gap-x-3">
        <a href="https://www.facebook.com/koonageinfotec/" target="_blank">
          <Image src="/icons/facebook.png" alt="Logo of Facebook" width={30} height={30} />
        </a>
        <a href="https://www.instagram.com/koonageinfotec/" target="_blank">
          <Image src="/icons/instagram.png" alt="Logo of Instagram" width={30} height={30} />
        </a>
        <a href="https://www.x.com/koonageinfotec/" target="_blank">
          {' '}
          <Image src="/icons/x.png" alt="Logo of X" width={30} height={30} />
        </a>
        <a href="https://www.linkedin.com/company/106294740/" target="_blank">
          {' '}
          <Image src="/icons/linkedIn.png" alt="Logo of LinkedIn" width={30} height={30} />
        </a>
      </div>
    </div>
  )
}
