import React from 'react'
import Image from 'next/image'
import AvatarGroup from './avatar-group'

const NewsLetterCard = () => {
  return (
    <div className="rounded-[16px] grid grid-cols-2 bg-white shadow-lg">
      <div className="w-full relative row-span-2">
        <Image
          src="/images/news-letter.png"
          alt="Newsletter"
          width={1700}
          height={1200}
          className="h-[100%] rounded-tl-[16px] rounded-bl-[16px]"
        />

        <div className="flex gap-3 items-center absolute right-[1rem] bottom-[1rem] bg-white rounded-[50px] px-2 py-1">
          <h3 className="scroll-m-20 text-xl font-bold tracking-tight text-[#FD661F]">
            2 vacancies
          </h3>
          {/* <p className="line-through">$500</p> */}
        </div>
      </div>

      <div className="pt-12 px-4 pb-16">
        <p className="mb-3">1-28 July 2022</p>
        <h3 className="scroll-m-20 text-[1rem] font-bold tracking-tight text-secondary mb-3">
          Product Management Basic - Course
        </h3>
        <p className="line-clamp-3">
          Product Management Masterclass, you will learn with Sarah Johnson - Head of Product
          Customer Platform Gojek Indonesia.
        </p>

        <div className="w-full grid place-content-center mt-8">
          <AvatarGroup />
        </div>
      </div>
    </div>
  )
}

export default NewsLetterCard
