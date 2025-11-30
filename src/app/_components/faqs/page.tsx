import React from 'react'
import Faq from '../faq/page'
import { Jost } from 'next/font/google'
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

export default function Faqs() {
  return (
    <div className="bg-[#EFFEFC] py-[100px] ">
      <div className="md:w-[50%] w-[100%] px-5 md:px-0 mx-auto">
        <div className="flex flex-col gap-y-6 pb-20">
          <h2
            className={`${schibstedGrotesk.className}  text-[32px] leading-[1.3] font-[700] text-center text-[#1E2763]`}
          >
            FAQs
          </h2>
          <p
            className={`${jost.className} text-center text-[#525252] text-xl font-normal leading-[1.5] w-[90%] mx-auto`}
          >
            Find answers to common questions about internships and our platform for students and
            companies.
          </p>
        </div>
        <Faq
          question="Who can apply?"
          answer="Any student, graduate, or early-career professional seeking internship opportunities can apply. We welcome individuals from various fields and backgrounds. Our platform is designed to connect you with verified internships."
        />
        <Faq
          question="How to sign up?"
          answer="Simply click on the 'Sign Up' button on our homepage. Fill out the registration form with your details. Once registered, you can complete your profile and start applying for internships."
        />
        <Faq
          question="Are internships paid?"
          answer="Some internships listed on our platform are paid, while others may offer academic credit or experience. Each internship listing will specify the compensation details. Be sure to check the descriptions for more information."
        />
        <Faq
          question="How to apply?"
          answer="After completing your profile, browse through available internships. Click on the ones that interest you and follow the application instructions provided. Make sure to tailor your application to each opportunity."
        />
        <Faq
          question="Can companies join?"
          answer="Yes, companies can join our platform to find talented interns. We encourage organizations of all sizes to register and post internship opportunities. Connect with driven students eager to contribute to your team."
        />
        <div className="text-center flex flex-col gap-y-6 pt-20">
          <h3
            className={`${schibstedGrotesk.className}  text-[32px] leading-[1.3] font-[700]  text-[#292929]`}
          >
            Still have questions?
          </h3>
          <p className={`${jost.className} text-[#525252] font-normal text-xl leading-[1.5]`}>
            We're here to help!
          </p>
          <a
            href="https://koonage.com/contact-us/"
            className={`bg-[#07CBC9] py-3 px-5 rounded-[100px] text-[#1E2763] text-xl font-normal leading-[1.5] ${jost.className} w-[146px] mx-auto`}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
