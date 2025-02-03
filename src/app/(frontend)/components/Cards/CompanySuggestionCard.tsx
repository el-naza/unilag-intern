import Image from 'next/image'
import React from 'react'

export default function CompanySuggestionCard() {
  return (
    <div>
      <Image
        className="w-full"
        width={100}
        height={100}
        src="/company-banner.png"
        alt="company-banner"
      />
      <div className="p-2">
        <h5 className="text-black mb-2 font-bold">CRM SHOPPING MALL</h5>
        <div className="text-[#8E8E93] text-xs mb-2">Career Area: Marketing</div>
        <div className="text-[#8E8E93] text-xs mb-2">Location: Ikeja, Lagos</div>
        <button className="w-full rounded bg-[#0B7077] text-white text-xs text-center p-2">
          View Details
        </button>
      </div>
    </div>
  )
}
