import Image from 'next/image'
import React from 'react'
import companyBanner from '@/app/(frontend)/assets/images/company-banner.svg'
import Link from 'next/link'

export default function CompanyPendingApplicationCard() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 rounded-lg border border-[#F1F1F1]">
      <Image
        height={150}
        width={100}
        className="rounded-tl-lg rounded-bl-lg h-full w-full"
        src={companyBanner}
        alt="company-banner"
      />
      <div className="col-span-3 sm:col-span-5 grid p-1">
        <div className="mt-auto sm:my-auto">
          <div className="ms-2">
            <h5 className="text-black mb-0 text-[12px]">CMR SHOPPING MALL</h5>
            <p className="text-[10px] text-[#8E8E93] mb-0">Career Area: Marketing</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <button className="text-[10px] w-full rounded p-1 bg-[#ECECEC] text-[#48484A] text-center">
              Cancel Application
            </button>
            <Link href="/student/applications/pending/1">
              <button className="text-[10px] w-full rounded p-1 bg-[#0B7077] text-white text-center">
                View Application
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
