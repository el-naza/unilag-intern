'use-client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 lg:px-24 md:px-16 sm:px-8 bg-white sticky top-0 w-full shadow-md z-20">
      <Image src="/images/unilag-logo.png" alt="Logo" width={60} height={100} />

      {/* <ul className="list-none lg:flex md:flex sm:hidden items-center lg:gap-40 md:gap-16 transition-all">
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="/home">Home</Link>
        </li>
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="/company">Companies</Link>
        </li>
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="/blog">Blog</Link>
        </li>
      </ul> */}

      <div className="flex gap-4 items-center mr-5 md:mr-0">
        <Link href="/waitinglist">
          <Button className="bg-primary text-white">Join now</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
