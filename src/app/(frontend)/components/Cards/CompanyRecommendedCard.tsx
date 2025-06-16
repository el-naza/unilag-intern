import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import companyBanner from '../../assets/images/company-banner.png'
import enrolledStudent1 from '../../assets/images/enrolled-student-1.svg'
import enrolledStudent2 from '../../assets/images/enrolled-student-2.svg'
import enrolledStudent3 from '../../assets/images/enrolled-student-3.svg'
import enrolledStudent4 from '../../assets/images/enrolled-student-4.svg'
import enrolledStudent5 from '../../assets/images/enrolled-student-5.svg'
import Link from 'next/link'
import fetchCompanyInternships from '@/services/fetchCompanyInternships'
import formatDate, { altFormatDate } from '@/utilities/formatDate'

export default function CompanyRecommendedCard({ company }) {
  const [internshipCount, setInternshipCount] = useState<number>(0)
  const [loadingInternshipCount, setLoadingInternshipCount] = useState<boolean>(false)

  const fetchInternshipCount = async () => {
    setLoadingInternshipCount(true)
    const internshipsRes: any = await fetchCompanyInternships({ company: company.id })
    setInternshipCount(internshipsRes.docs.length)
    setLoadingInternshipCount(false)
  }

  useEffect(() => {
    fetchInternshipCount()
  }, [])
  return (
    <div className="shadow rounded-lg">
      <div className="rounded-t-lg relative flex flex-col">
        <Image className="rounded-t-lg w-full" src={companyBanner} alt="company-banner" />
        <div className="-bottom-5 absolute flex w-full">
          <div className="bg-[#FAFAFA] px-2 py-3 mx-auto w-[90%] rounded-full text-sm m-auto block">
            {/* <div className="relative">
              <Image
                className="absolute -top-1.5 right-[130px] z-50"
                src={enrolledStudent1}
                alt="enrolled-student-1"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[110px] z-40"
                src={enrolledStudent2}
                alt="enrolled-student-2"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[90px] z-30"
                src={enrolledStudent3}
                alt="enrolled-student-3"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[70px] z-10"
                src={enrolledStudent4}
                alt="enrolled-student-4"
                height={29}
                width={29}
              />
              <Image
                className="absolute -top-1.5 right-[50px]"
                src={enrolledStudent5}
                alt="enrolled-student-5"
                height={29}
                width={29}
              />
            </div> */}
            <div className="text-center text-[#777795]">
              <span>
                {company.employmentCount !== 0 ? '+' : ''}
                {company.employmentCount} students
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg p-4 mt-4 grid gap-5">
        <div className="grid gap-2">
          {company.firstInternship ? (
            <span className="text-xs text-[#777795]">
              {altFormatDate(company.firstInternship.startDate)} -{' '}
              {altFormatDate(company.firstInternship.endDate)}
            </span>
          ) : (
            ''
          )}
          <h5 className="text-[#195F7E] text-md font-bold">{company.name}</h5>
          <p className="text-xs text-[#4D4D4D]">{company.description}</p>
          <p className="text-xs text-[#4D4D4D]">{company.address}</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex">
            <span className="my-auto text-[#FD661F] text-md">
              {loadingInternshipCount
                ? '...'
                : `${internshipCount} ${internshipCount === 1 ? 'vacancy' : 'vacancies'}`}
            </span>
          </div>
          <div>
            <Link href={`/student/companies/${company.id}`}>
              <button className="bg-[#195F7E] hover:bg-primary/90 rounded-lg p-2 text-xs text-white w-full">
                Enroll Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
