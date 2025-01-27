'use client'

import React from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import CompanyPendingApplicationCard from '@/app/(frontend)/components/Cards/CompanyPendingApplicationCard'
import Image from 'next/image'
import advertText from '../../../assets/images/adverts.png'
import Link from 'next/link'
import CompanyLargePendingApplicationCard from '@/app/(frontend)/components/Cards/CompanyLargePendingApplicationCard'

export default function Page() {
  return (
    <div className="min-h-screen relative text-sm text-white bg-white lg:bg-[#195F7E] py-0 lg:py-20">
      <div className="lg:hidden block">
        <div className="bg-[#195F7E] container pt-4 pb-1">
          <StudentHeader />
          <StudentNavbar />
        </div>
        <div className="container">
          <main className="py-1 bg-white text-sm">
            <div className="mt-1 mb-3">
              <h6 className="text-[#48484A]">Pending Applications</h6>
            </div>
            <div className="grid gap-4">
              <CompanyPendingApplicationCard />
              <CompanyPendingApplicationCard />
              <CompanyPendingApplicationCard />
            </div>
          </main>
        </div>
      </div>
      <div className="lg:block hidden h-full">
        <div className="container">
          <Link href={'/student'}>
            <div className="text-white flex gap-1 mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6668 9.16634H6.52516L11.1835 4.50801L10.0002 3.33301L3.3335 9.99967L10.0002 16.6663L11.1752 15.4913L6.52516 10.833H16.6668V9.16634Z"
                  fill="white"
                />
              </svg>
              <span>Back</span>
            </div>
          </Link>
          <div className="text-black bg-white rounded-lg">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4">
                <div className="p-5">
                  <h5 className="text-2xl font-medium mb-5">Pending Companies</h5>
                  <div className="grid gap-4">
                    <CompanyLargePendingApplicationCard />
                    <CompanyLargePendingApplicationCard />
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="rounded-lg bg-[#EBE7E77A] flex p-5">
                  <Image className="m-auto" src={advertText} alt="advert-text" />
                </div>
                <div className="rounded-lg bg-[#EBE7E77A] flex p-5">
                  <Image className="m-auto" src={advertText} alt="advert-text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
