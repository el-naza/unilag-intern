'use client'

import React, { useState } from 'react'
import { Jost } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'
import SchoolCard from '../_components/schoolCard/page'
import { schoolData } from '../_components/schoolData/page'
import Join from '../_components/join/page'

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

export default function SchoolPortals() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredSchools = schoolData.filter((school) =>
    school.schoolName.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 9
  const totalPages = Math.ceil(filteredSchools.length / cardsPerPage)
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentCards = filteredSchools.slice(startIndex, endIndex)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="pt-[100px]">
      <div className="flex flex-col gap-y-8 pb-[44px]">
        <h1
          className={`${schibstedGrotesk.className} font-[700] md:text-[3rem] leading-[1.5] text-[#292929] text-center md:w-[40%] mx-auto text-[2rem] px-5`}
        >
          Select Your University to Access Your Internship Portal
        </h1>
        <p
          className={`${jost.className} font-[500] text-xl leading-[1.5] text-[#525252] text-center md:w-[40%] mx-auto px-5`}
        >
          Access your internship dashboard by choosing your university. From here, you can complete
          your profile, explore opportunities, and stay connected with company invitations tailored
          to your school.
        </p>
        <div className="border-solid border-[1px] border-[#DCDCDC80]/50 py-3 px-5 rounded-[100px] md:w-[27%] w-[80%] mx-auto flex items-center gap-x-4">
          <Image
            src="/icons/search.png"
            alt="Search Icon"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search for your school"
            onChange={handleSearch}
            className={`${jost.className} font-normal text-[16px] leading-[1.5] text-[#525252] h-[3rem] w-[100%] active:border-none focus:outline-none`}
          />
        </div>
      </div>

      {/* Display current page cards */}
      <div className="md:grid md:grid-cols-3 gap-5 md:px-[155.5px] px-5 flex flex-col gap-y-6">
        {currentCards.map((school) => (
          <SchoolCard
            key={school.id}
            id={school.id}
            schoolLogo={school.schoolLogo}
            schoolName={school.schoolName}
            motto={school.motto}
            availability={school.availability}
            portal={school.portal}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div
        className={`${jost.className} font-[500] text-xl leading-[1.5] flex justify-center gap-x-8 py-16`}
      >
        <div
          onClick={handlePrevious}
          className={`flex items-center gap-x-1 cursor-pointer text-[#4172F0] ${currentPage === 1 ? 'text-[#DCDCDC] cursor-not-allowed' : ''}`}
        >
          {currentPage === 1 ? (
            <Image
              src="/icons/arrowLeft.svg"
              alt="Previous arrow"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          ) : (
            <Image
              src="/icons/arrowRight.svg"
              alt="Next arrow"
              width={24}
              height={24}
              className="w-6 h-6 rotate-180"
            />
          )}
          <p>Previous</p>
        </div>

        <div
          onClick={handleNext}
          className={`flex items-center gap-x-1 cursor-pointer text-[#4172F0] ${currentPage === totalPages ? 'text-[#DCDCDC] cursor-not-allowed' : ''}`}
        >
          <p>Next</p>
          {currentPage === totalPages ? (
            <Image
              src="/icons/arrowLeft.svg"
              alt="Previous arrow"
              width={24}
              height={24}
              className="w-6 h-6 -rotate-180"
            />
          ) : (
            <Image
              src="/icons/arrowRight.svg"
              alt="Next arrow"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          )}
        </div>
      </div>

      <Join
        headingText="Not in School? Still Hungry to Learn?"
        normalText="Kickstart your career journey with hands-on experience, even if you're not enrolled in a university."
      />
    </div>
  )
}
