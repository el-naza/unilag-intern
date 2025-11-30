'use client'

import Image from 'next/image'
import { Jost } from 'next/font/google'
import { use, useState } from 'react'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500'], // Choose the weights you need
  variable: '--font-jost',
})

export default function Navigation() {
  const [display, setDisplay] = useState(false)

  function handleDisplay() {
    setDisplay(!display)
  }

  return (
    <div
      className={`md:mx-[149px] mx-5 mt-[12px] md:flex md:justify-between bg-[#DCE7FD] ${jost.className} rounded-[12px] py-6 md:px-16 px-5 items-center`}
    >
      <div className="flex gap-x-20 md:justify-start justify-between">
        <a href="/">
          <Image
            src="/images/logo.png"
            alt="Logo of Intrn"
            width={72}
            height={20}
            className="w-18 h-5"
          />
        </a>
        <Image
          src="/icons/hamburger.svg"
          alt="Hamburger Icon"
          width={72}
          height={20}
          className="w-18 h-5 cursor-pointer md:hidden"
          onClick={handleDisplay}
        />
      </div>
      <ul
        className={`text-base md:flex md:flex-row flex flex-col md:gap-x-8 md:pt-0 md:gap-y-0 text-[#525252] ${display ? 'block gap-y-8 pt-8' : 'hidden'}`}
      >
        <li>
          <a href="/school-portals">School Portals</a>
        </li>
        <li>
          <a href="https://app.intrn.com/login">Companies</a>
        </li>
        <li>
          <a href="/about-us">About Us</a>
        </li>
        <a
          href="https://app.intrn.com/signup"
          className="bg-[#1E2763] py-2 px-5 rounded-[100px] text-white md:hidden block w-[40%]"
        >
          Sign Up
        </a>
      </ul>
      <div>
        <a
          href="https://app.intrn.com/signup"
          className="bg-[#1E2763] py-2 px-5 rounded-[100px] text-white md:block hidden"
        >
          Sign Up
        </a>
      </div>
    </div>
  )
}
