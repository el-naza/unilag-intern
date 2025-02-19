'use-client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 lg:px-24 md:px-16 sm:px-8 bg-white sticky top-0 w-full shadow-md z-20">
      <Image src="/images/unilag-logo.png" alt="Logo" width={60} height={100} />

      <ul className="list-none lg:flex md:flex sm:hidden items-center lg:gap-40 md:gap-16 transition-all">
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="/home">Home</Link>
        </li>
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="/company">Companies</Link>
        </li>
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="/blog">Blog</Link>
        </li>
      </ul>

      <div className="flex gap-4 items-center">
        <Button className='bg-white text-primary' variant='ghost'>Log In</Button>
        <Button className='bg-primary text-white'>Sign Up</Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden md:hidden sm:block">
              <Image src="/icons/hamburger.png" alt="Logo" width={30} height={5} />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <div>
              <ul className="list-none items-center lg:gap-40 md:gap-16 transition-all leading-[2rem] my-4">
                <li className="hover:text-[#A71C51] hover:font-semibold hover:bg-slate-300 p-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="/home">Home</Link>
                </li>
                <li className="hover:text-[#A71C51] hover:font-semibold hover:bg-slate-300 p-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="/company">Companies</Link>
                </li>
                <li className="hover:text-[#A71C51] hover:font-semibold hover:bg-slate-300 p-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
