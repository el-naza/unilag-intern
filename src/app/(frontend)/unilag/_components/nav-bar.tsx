'use-client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center lg:px-8 sm:px-4 py-2 absolute top-0 z-20 right-0 left-0">
      <Image src="/images/unilag-logo.png" alt="Logo" width={60} height={100} />

      <ul className="list-none lg:flex md:flex sm:hidden items-center lg:gap-40 md:gap-16 transition-all max-md:hidden">
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="#">Home</Link>
        </li>
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="#companies">Companies</Link>
        </li>
        <li className="hover:text-[#A71C51] hover:font-semibold">
          <Link href="#interns">Interns</Link>
        </li>
      </ul>

      <div className="flex gap-4 items-center">
        <Link href="/company-auth/login" className="lg:block md:block sm:hidden xs:hidden">
          <Button
            className="bg-white text-primary uppercase border-white border-[1px]"
            variant="ghost"
          >
            I’m a company
          </Button>
        </Link>
        <Link href="/auth/login" className="lg:block md:block sm:hidden xs:hidden">
          <Button className="bg-primary text-white uppercase border-[1px]">I’m a Student</Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="lg:hidden md:hidden sm:block xs:block text-[2.3rem] p-2"
            >
              <Image src="/icons/hamburger.png" alt="Logo" width={30} height={100} />
            </Button>
          </SheetTrigger>

          <SheetContent className="bg-white">
            <div>
              <ul className="list-none items-center lg:gap-40 md:gap-16 transition-all leading-[2rem] my-4">
                <li className="hover:text-[#A71C51] hover:font-semibold hover:bg-slate-300 p-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="#">Home</Link>
                </li>
                <li className="hover:text-[#A71C51] hover:font-semibold hover:bg-slate-300 p-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="#companies">Companies</Link>
                </li>
                <li className="hover:text-[#A71C51] hover:font-semibold hover:bg-slate-300 p-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="#interns">Interns</Link>
                </li>
                <li className="py-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="/company-auth/login">
                    <Button className="bg-white text-primary uppercase" variant={'outline'}>
                      I’m a company
                    </Button>
                  </Link>
                </li>
                <li className="py-2 rounded-xl mb-4 cursor-pointer">
                  <Link href="/auth/login">
                    <Button className="bg-primary text-white uppercase border-[1px]">
                      I’m a Student
                    </Button>
                  </Link>
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
