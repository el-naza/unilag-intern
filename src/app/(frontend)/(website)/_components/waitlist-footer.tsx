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
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-2 xl:mx-5">
          {/* Logo */}
          <div className="flex justify-center xl:justify-start xl:ml-5">
            <Image
              src={'/images/unilag-logo.png'}
              alt="Logo"
              width={100}
              height={100}
              className="w-[60px] xl:w-[60px] xl:h-[60px]"
            />
          </div>

          {/* Address */}
          <div className="text-center xl:text-left xl:-ml-32">
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 xl:mb-5 flex-shrink-0"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  <strong>Address:</strong> University of Lagos, University Road, Lagos Mainland,
                  Akoka, Yaba, Lagos, Nigeria.
                </span>
              </li>
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Tel:{' '}
                <a href="tel:+23498720938" className="hover:underline">
                  +23498720938
                </a>
              </li>
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Response Hours: 8am to 5pm
              </li>
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email: info@onlearn.com
              </li>
            </ul>
          </div>

          {/* Intern Categories */}
          <div className="text-center xl:text-left mt-5 xl:mt-0 xl:ml-2">
            <p className="text-black font-semibold mb-2">Intern Categories</p>
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li>SIWES</li>
              <li>Teaching Practice</li>
              <li>Housemanship</li>
              <li>Others</li>
            </ul>
          </div>

          {/* Links */}
          <div className="text-center xl:text-left mt-5 xl:mt-0 xl:-ml-10">
            <p className="text-black font-semibold mb-2">Connect with us</p>
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li className="hover:underline flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <Link href="#">@koonageinfotec</Link>
              </li>
              <li className="hover:underline flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <line x1="4" y1="4" x2="20" y2="20"></line>
                  <line x1="4" y1="20" x2="20" y2="4"></line>
                </svg>
                <Link href="#">@koonageinfotec</Link>
              </li>
              <li className="hover:underline flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <Link href="#">@koonageinfotec</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center xl:items-start xl:-ml-20">
            <p className="text-primary xl:text-sm font-normal mb-2 mt-5 xl:mt-0 text-center xl:text-left">
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
