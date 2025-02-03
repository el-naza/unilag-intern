import Image from 'next/image'
import React from 'react'
import companyBanner from '../../assets/images/company-banner.png'
import enrolledStudent1 from '../../assets/images/enrolled-student-1.svg'
import enrolledStudent2 from '../../assets/images/enrolled-student-2.svg'
import enrolledStudent3 from '../../assets/images/enrolled-student-3.svg'
import enrolledStudent4 from '../../assets/images/enrolled-student-4.svg'
import enrolledStudent5 from '../../assets/images/enrolled-student-5.svg'

export default function CompanyRecommendedCard() {
  return (
    <div className="shadow rounded-lg">
      <div className="rounded-t-lg relative flex flex-col">
        <Image className="rounded-t-lg" src={companyBanner} alt="company-banner" />
        <div className="-bottom-5 absolute flex w-full">
          <div className="bg-[#FAFAFA] px-2 py-3 mx-auto w-[90%] rounded-full text-sm m-auto block grid grid-cols-2">
            <div className="relative">
              <Image
                className="absolute -top-1.5 right-[90px] z-50"
                src={enrolledStudent1}
                alt="enrolled-student-1"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[70px] z-40"
                src={enrolledStudent2}
                alt="enrolled-student-2"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[50px] z-30"
                src={enrolledStudent3}
                alt="enrolled-student-3"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[30px] z-10"
                src={enrolledStudent4}
                alt="enrolled-student-4"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[10px]"
                src={enrolledStudent5}
                alt="enrolled-student-5"
                height={29}
                width={29}
              />
            </div>
            <div className="flex">
              <span>+40 students</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg p-4 mt-4 grid gap-5">
        <div className="grid gap-2">
          <span className="text-xs text-[#777795]">1 - 28 July 2022</span>
          <h5 className="text-[#195F7E] text-md font-bold">Product Management Basic - Course</h5>
          <p className="text-xs text-[#4D4D4D]">
            Product Management Masterclass, you will learn with Sarah Johnson - Head of Product
            Customer Platform Gojek Indonesia.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex">
            <span className="my-auto text-[#FD661F] text-md">2 vacancies</span>
          </div>
          <div>
            <button className="bg-[#195F7E] rounded-lg p-2 text-xs text-white w-full">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
