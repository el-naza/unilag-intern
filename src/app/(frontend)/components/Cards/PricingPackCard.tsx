import Link from 'next/link'
import React from 'react'

export default function PricingPackCard({ plan }: any) {
  return (
    <div
      className={`min-h-[400px] rounded-xl grid gap-5 shadow-md ${plan.id === 1 ? 'bg-white text-black' : plan.id === 2 ? 'bg-[#0B7077] text-white' : 'bg-[#195F7E] text-white'} p-5`}
    >
      <div className="text-center grid gap-3">
        <span className="font-medium text-sm">{plan.name}</span>
        <h5 className="font-medium text-xl">{plan.price}</h5>
        <span className="text-sm">{plan.description}</span>
      </div>
      <ul
        className={`ms-4 text-[12px] ${plan.id === 1 ? 'list-image-[url("/static-icons/pricing-check-black.svg")]' : 'list-image-[url("/static-icons/pricing-check-white.svg")]'}`}
      >
        {plan.points.map((point: string) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="mt-auto">
        {plan.id === 1 ? (
          <button
            disabled
            className="w-full rounded-lg p-3 bg-[#ECECEC] border-[#ECECEC] text-[#195F7E] text-center text-xs"
          >
            Active Plan
          </button>
        ) : (
          <Link href="/student/pricing/payment">
            <button
              className={`w-full rounded-lg p-3 bg-white border-white ${plan.id === 2 ? 'text-[#0B7077]' : 'text-[#195F7E]'} text-center text-xs`}
            >
              Buy Now
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
