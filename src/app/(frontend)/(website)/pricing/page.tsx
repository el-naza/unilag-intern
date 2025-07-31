import React from 'react'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'
import PriceCard from '../_components/price-card'
import { pricingData } from '../_components/price-data'

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

const prices = pricingData.plans

export default function Pricing() {
  return (
    <div className="">
      <div className=" md:pt-[100px] pt-16 pb-16 px-5 md:px-0">
        <h1
          className={`${schibstedGrotesk.className} md:text-[85px] font-[900] text-center max-w-[1000px] mx-auto leading-[1.5] text-[2.5rem] text-[#292929]`}
        >
          Choose a Plan That Fits Your Institution
        </h1>
        <p
          className={`${jost.className} text-xl text-center max-w-[650px] mx-auto leading-[1.5] text-[#525252]`}
        >
          Flexible pricing designed for growth, transparency, and impact. Transform your internship
          management today.
        </p>
      </div>

      <div className="px-[68.5px] pt-[82px]">
        <div className="bg-[linear-gradient(270deg,_rgba(83,245,236,1),_rgba(57,142,167,1),_rgba(50,116,150,1),_rgba(43,91,133,1),_rgba(30,39,99,1))] rounded-2xl relative py-[125px] md:px-[104px] px-5">
          <Image
            src="/images/confetti.png"
            alt="Confetti"
            width={64}
            height={64}
            className="absolute left-6"
          />
          <Image
            src="/images/free-tag.png"
            alt="Free"
            width={100}
            height={45.38}
            className="absolute top-[29.5px] left-[101.4px]"
          />
          <Image
            src="/images/man-holding-book.png"
            alt="Man"
            width={470}
            height={521}
            className="absolute w-[470px] h-[521px] bottom-0 -right-7 "
          />
          <div className="flex flex-col w-[100%]  md:w-[50%]">
            <h2
              className={`text-white md:text-[40px] text-[2rem] leading-[1.5] font-[700] pb-3 ${schibstedGrotesk.className}`}
            >
              First Five Schools Get Free Access!
            </h2>
            <p className={`font-normal leading-[1.5] text-xl ${jost.className} text-white pb-8`}>
              limited time offer - Transform your internship management at no cost
            </p>
            <a
              href="/"
              className={`bg-[#4172F0] py-3 px-5 rounded-xl text-white text-xl font-normal self-start leading-[1.5] ${jost.className} text-center`}
            >
              Claim Your Spot
            </a>
          </div>
        </div>
      </div>
      {/* Price Cards */}
      <div className="md:grid md:grid-cols-4 pt-[100px] pb-[60px] md:px-[68.5px] px-5 gap-10 items-end">
        {prices.map((plan) => (
          <PriceCard key={plan.id} plan={plan} />
        ))}
        {/* Fourth Card */}
        <div className="pt-5 md:pt-0">
          <div className="pt-[14.35px] px-[21.5px] pb-[140px] bg-[#1E2763] text-white rounded-[18px]">
            <div className="flex gap-[7.17px] justify-center bg-[#53F5EC] py-[8.24px] text-[#064B48] rounded-[35.87px]">
              <Image src="/images/confetti.png" alt="Confetti" width={22} height={22} />
              <p className={`${jost.className} font-bold text-[18px]`}>
                First Five Schools Get It Free!
              </p>
            </div>
            <div className={` ${jost.className}`}>
              <p className={`font-medium text-[1.2rem] text-[#A0B9F8] pb-[7.17px] pt-[21.52px]`}>
                Enterprise
              </p>
              <p className={`font-bold text-[1.5rem] pb-[14px] ${schibstedGrotesk.className}`}>
                Custom Plan
              </p>
              <p className={`font-bold text-[2.5rem] pb-[7.17px] ${schibstedGrotesk.className}`}>
                Let's Build
                <span className="font-medium text-[1.2rem]"> Your Solution</span>
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=2348080864583&text&type=phone_number&app_absent=0"
                className={`text-[#292929] text-[1.2rem] bg-[#DCE7FD] font-semibold rounded-[7.17px] text-center py-[11px] block $`}
              >
                Talk to Sales
              </a>
              <p className={`pt-[22px] pb-[15px] font-semibold text-[1.2rem]`}>
                Tailored Specifically for your needs
              </p>
              <div className="flex flex-col gap-[7.17px] text-[1.2rem]">
                <div className="flex gap-[11px]">
                  <Image
                    src="/icons/check-icon-white.svg"
                    alt="Check Icon"
                    width={18}
                    height={18}
                  />
                  <p>Institution branded interface</p>
                </div>
                <div className="flex gap-[11px]">
                  <Image
                    src="/icons/check-icon-white.svg"
                    alt="Check Icon"
                    width={18}
                    height={18}
                  />
                  <p>API Integrations</p>
                </div>
                <div className="flex gap-[11px]">
                  <Image
                    src="/icons/check-icon-white.svg"
                    alt="Check Icon"
                    width={18}
                    height={18}
                  />
                  <p>On-premise or cloud</p>
                </div>
                <div className="flex gap-[11px]">
                  <Image
                    src="/icons/check-icon-white.svg"
                    alt="Check Icon"
                    width={18}
                    height={18}
                  />
                  <p>Advanced reporting</p>
                </div>
                <div className="flex gap-[11px]">
                  <Image
                    src="/icons/check-icon-white.svg"
                    alt="Check Icon"
                    width={18}
                    height={18}
                  />
                  <p>White-label solution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`font-normal leading-[1.5] text-xl flex flex-col gap-8 ${jost.className} text-[#292929] items-center pb-[120px]`}
      >
        <h2
          className={`text-[#292929]md:text-[3rem] text-[2rem] leading-[1.5] font-[700] ${schibstedGrotesk.className}`}
        >
          Need Help Choosing?
        </h2>
        <p className="md:text-left text-center">
          Our team is here to help you find the perfect plan for your institutions needs.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=2348080864583&text&type=phone_number&app_absent=0"
          className="bg-[#FAFAFA] py-[15px] px-[41px] rounded-[100px] border-[1px] border-[#E9E9E9] flex gap-3"
        >
          <Image src="/icons/chat-icon.svg" alt="Chat" width={24} height={24} className="" />
          <p>Chat with us</p>
        </a>
      </div>
    </div>
  )
}
