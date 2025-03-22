import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import './footer.scss'

const Footer = () => {
  return (
    <footer className="bg-[#D2E6E4] text-primary w-full curved-top px-4 sm:px-6 xl:px-8 lg:px-24 py-12 xl:pt-24 xl:pb-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Logo */}
          <div className="flex justify-center xl:justify-start">
            <Image
              src={'/images/unilag-logo.png'}
              alt="Logo"
              width={100}
              height={100}
              className="w-[100px] xl:w-[200px]"
            />
          </div>

          {/* Address */}
          <div className="text-center xl:text-left">
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li>
                <strong>Address:</strong> University of Lagos, University Road, Lagos Mainland,
                Akoka, Yaba, Lagos, Nigeria.
              </li>
              <li>
                Tel:{' '}
                <a href="tel:+23498720938" className="hover:underline">
                  +23498720938
                </a>
              </li>
              <li>Response Hours: 8am to 5pm</li>
              <li>Email: info@onlearn.com</li>
            </ul>
          </div>

          {/* Intern Categories */}
          <div className="text-center xl:text-left">
            <p className="text-black font-semibold mb-3">Intern Categories</p>
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li>SIWES</li>
              <li>Teaching Practice</li>
              <li>Housemanship</li>
              <li>Others</li>
            </ul>
          </div>

          {/* Links */}
          <div className="text-center xl:text-left">
            <p className="text-black font-semibold mb-3">Connect with us</p>
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li className="hover:underline">
                <Link href="/">@koonageInfotech</Link>
              </li>
              <li className="hover:underline">
                <Link href="/">koonage@X</Link>
              </li>
              <li className="hover:underline">
                <Link href="/">koonage@Instagram</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center xl:items-start">
            <p className="text-black font-semibold mb-3 text-center xl:text-left">
              Stay up to date with the latest information
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2 bg-white p-2 rounded-[14px]">
              <Input type="email" placeholder="Email" className="border-0 outline-none" />
              <Button type="submit" className="bg-primary text-white rounded-[12px]">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
