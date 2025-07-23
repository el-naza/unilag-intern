import Image from 'next/image'
import React from 'react'
import companyBanner from '../../assets/images/company-banner.png'
import Link from 'next/link'

export default function CompanySuggestionCard({ company }) {
  return (
    <div>
      <Image
        className="w-full"
        width={100}
        height={100}
        src={company?.image?.url || companyBanner}
        alt="company-banner"
      />
      <div className="p-2">
        <h5 className="text-black mb-2 font-bold">{company.name}</h5>
        <div className="text-[#8E8E93] text-xs mb-2">Career Area: {company.courseAreas}</div>
        <div className="text-[#8E8E93] text-xs mb-2">Location: {company.address}</div>
        <Link href={`/student/companies/${company.id}`}>
          <button className="w-full rounded bg-[#0B7077] text-white text-xs text-center p-2">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}
