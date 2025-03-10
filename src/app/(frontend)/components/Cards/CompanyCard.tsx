import Image from 'next/image'
import React from 'react'
import companyBanner from '../../assets/images/company-banner.png'
import enrolledStudent1 from '../../assets/images/enrolled-student-1.svg'
import enrolledStudent2 from '../../assets/images/enrolled-student-2.svg'
import enrolledStudent3 from '../../assets/images/enrolled-student-3.svg'
import enrolledStudent4 from '../../assets/images/enrolled-student-4.svg'
import enrolledStudent5 from '../../assets/images/enrolled-student-5.svg'
import Link from 'next/link'

export default function CompanyCard({ company }) {
  return (
    <div className="shadow rounded-lg">
      <div className="rounded-t-lg relative flex flex-col">
        <Image className="rounded-t-lg" src={companyBanner} alt="company-banner" />
        <div className="-bottom-5 absolute flex w-full">
          <div className="bg-[#FAFAFA] px-2 py-3 mx-auto w-[90%] rounded-full text-sm m-auto block grid grid-cols-2">
            <div className="relative">
              <Image
                className="absolute -top-1 right-[50px] z-50"
                src={enrolledStudent1}
                alt="enrolled-student-1"
                height={20}
                width={20}
              />
              <Image
                className="absolute -top-1 right-[40px] z-40"
                src={enrolledStudent2}
                alt="enrolled-student-2"
                height={20}
                width={20}
              />
              <Image
                className="absolute -top-1 right-[30px] z-30"
                src={enrolledStudent3}
                alt="enrolled-student-3"
                height={20}
                width={20}
              />
              <Image
                className="absolute -top-1 right-[20px] z-10"
                src={enrolledStudent4}
                alt="enrolled-student-4"
                height={20}
                width={20}
              />
              <Image
                className="absolute -top-1 right-[10px]"
                src={enrolledStudent5}
                alt="enrolled-student-5"
                height={20}
                width={20}
              />
            </div>
            <div className="flex">
              <span className="text-xs">+40 students</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg p-4 mt-4 grid gap-5">
        <div className="grid gap-2">
          <span className="text-xs text-[#777795]">1 - 28 July 2022</span>
          <Link href={`/student/companies/${company.id}`}>
            <h5 className="text-[#195F7E] text-md font-bold">{company.name}</h5>
          </Link>
          <p className="text-xs text-[#4D4D4D]">{company.description}</p>
          <p className="text-xs text-[#4D4D4D]">{company.address}</p>
        </div>
      </div>
    </div>
  )
}
