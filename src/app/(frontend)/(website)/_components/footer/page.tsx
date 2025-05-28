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
    <div className="flex justify-between items-center py-[51px] px-16">
      <a href="/">
        {' '}
        <Image src="/images/logo.png" alt="Logo of Koonage" width={71} height={20} />
      </a>
      <div className={`flex gap-x-6 ${jost.className} text-xl font-normal leading-[1.5] pt-[21px]`}>
        <p className="#0B0B00">&copy; 2025 Intrns.com All rights reserved.</p>
        <ul className={`flex gap-x-6 text-[#1E2763] underline`}>
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
        <a href="#">
          <Image src="/icons/facebook.png" alt="Logo of Koonage" width={30} height={30} />
        </a>
        <a href="#">
          <Image src="/icons/instagram.png" alt="Logo of Koonage" width={30} height={30} />
        </a>
        <a href="">
          {' '}
          <Image src="/icons/x.png" alt="Logo of Koonage" width={30} height={30} />
        </a>
        <a href="">
          {' '}
          <Image src="/icons/linkedIn.png" alt="Logo of Koonage" width={30} height={30} />
        </a>
      </div>
    </div>
  )
}
