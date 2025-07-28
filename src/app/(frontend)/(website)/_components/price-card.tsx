import React from 'react'
import { Jost, Palanquin } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jost',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-schibstedGrotesk',
})

export default function PriceCard({ plan }) {
  return (
    <div>
      <div
        className={
          plan.tag === 'Most Popular'
            ? `border-[0.9px] rounded-[18px] border-[#4172F0] `
            : ` border-[0.9px] border-[#E9E9E9] rounded-[18px]`
        }
      >
        {plan.tag === 'Most Popular' && (
          <div className="flex gap-[7.17px] justify-center bg-[#4172F0] py-[15px] text-white rounded-tl-[18px] rounded-tr-[18px]">
            <Image src="/icons/star-icon-white.svg" alt="Check Icon" width={14.35} height={14.35} />
            <p>Most Popular</p>
          </div>
        )}
        <div
          className={`bg-[#FAFBFF] px-[21.5px] pt-[21.5px] pb-[129px] ${jost.className} rounded-[18px]`}
        >
          <p className={`font-medium text-[1.2rem] text-[#4172F0] pb-[7.17px]`}>{plan.year} Year</p>
          <p
            className={`font-bold text-[1.5rem] text-[#292929] pb-[14px] ${schibstedGrotesk.className}`}
          >
            {plan.name}
          </p>
          <p
            className={`font-bold text-[2.5rem] text-[#292929] pb-[7.17px] ${schibstedGrotesk.className}`}
          >
            &#8358; {plan.price.annual}
            <span className="text-[#525252] font-medium text-[1.2rem]"> /year</span>
          </p>
          <div className="flex gap-[21.52px] pb-[22px]">
            <p className="text-[#C4C4C4] line-through text-[1.2rem]">
              &#8358;{plan.price.original}
            </p>
            <p className="text-[#044D49] bg-[#53F5EC] py-0.5 px-[11px] rounded-[22px] ">
              Save {plan.price.discount}
            </p>
          </div>
          <a
            href="/intern-type"
            className={`text-[#1350EC] text-[1.2rem] border-[0.9px] border-[#4172F0] font-semibold rounded-[7.17px] text-center py-[11px] block ${plan.tag === 'Most Popular' && 'bg-[#4172F0] text-white'} `}
          >
            {plan.cta}
          </a>
          <p className={`pt-[22px] pb-[15px] font-semibold text-[1.2rem] text-[#525252]`}>
            {plan.description}
          </p>
          <div className="flex flex-col gap-[7.17px] text-[rgb(82,82,82)] text-[1.2rem]">
            {plan.points.map((item, index) => (
              <div key={index} className="flex gap-[11px]">
                <Image src="/icons/check-icon.svg" alt="Check Icon" width={18} height={18} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
