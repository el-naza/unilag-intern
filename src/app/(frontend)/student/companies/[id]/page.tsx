'use client'

import CompanySuggestionCard from '@/app/(frontend)/components/Cards/CompanySuggestionCard'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import advertText from '../../../assets/images/adverts.png'
import { useParams } from 'next/navigation'
import fetchDoc from '@/services/fetchDoc'

const Page = () => {
  const { id }: { id: string } = useParams()
  const [company, setCompany] = useState<any>({})

  const fetchCompany = async () => {
    const res: any = await fetchDoc('companies', id)
    setCompany(res)
  }

  useEffect(() => {
    fetchCompany()
  }, [])
  return (
    <div className="min-h-screen relative text-sm text-black bg-white lg:bg-[#195F7E] py-0">
      <div className="container">
        <main className="py-1 lg:bg-[#195F7E] lg:py-20">
          <Link className="hidden lg:block" href={'/student'}>
            <div className="text-white flex gap-1 mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6668 9.16634H6.52516L11.1835 4.50801L10.0002 3.33301L3.3335 9.99967L10.0002 16.6663L11.1752 15.4913L6.52516 10.833H16.6668V9.16634Z"
                  fill="white"
                />
              </svg>
              <span>Back</span>
            </div>
          </Link>
          <div className="bg-white lg:rounded-xl">
            <h5 className="block lg:hidden text-black my-3 font-bold">Application Details</h5>
            <Image
              height={100}
              width={100}
              className="w-full mb-3 lg:rounded-xl"
              src="/company-banner.png"
              alt="company-banner"
            />
            <div className="grid lg:grid-cols-4">
              <div className="hidden lg:block rounded-lg bg-[#EBE7E77A] flex p-5">
                <Image className="m-auto" src={advertText} alt="advert-text" />
              </div>
              <div className="lg:col-span-2 p-4">
                <div className="flex gap-2 items-center mb-3">
                  <Image height={32} width={32} src="/company-logo.png" alt="company-logo" />
                  <h5 className="text-black font-bold uppercase">{company.name}</h5>
                </div>
                <p className="text-[#8E8E93] text-xs mb-3">{company.description}</p>
                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div className="grid grid-rows-1 gap-1">
                    <svg
                      width="12"
                      height="15"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6667 2.31331H10V0.97998H8.66667V2.31331H3.33333V0.97998H2V2.31331H1.33333C0.593333 2.31331 0.00666666 2.91331 0.00666666 3.64665L0 12.98C0 13.7133 0.593333 14.3133 1.33333 14.3133H10.6667C11.4 14.3133 12 13.7133 12 12.98V3.64665C12 2.91331 11.4 2.31331 10.6667 2.31331ZM10.6667 12.98H1.33333V6.31331H10.6667V12.98ZM10.6667 4.97998H1.33333V3.64665H10.6667V4.97998ZM4 8.97998H2.66667V7.64665H4V8.97998ZM6.66667 8.97998H5.33333V7.64665H6.66667V8.97998ZM9.33333 8.97998H8V7.64665H9.33333V8.97998ZM4 11.6466H2.66667V10.3133H4V11.6466ZM6.66667 11.6466H5.33333V10.3133H6.66667V11.6466ZM9.33333 11.6466H8V10.3133H9.33333V11.6466Z"
                        fill="#0B7077"
                      />
                    </svg>
                    <div className="text-[#0B7077]">Acceptance Period</div>
                    <div className="text-[#48484A]">10th - 25th July 2025</div>
                  </div>
                  <div className="grid grid-rows-1 gap-1">
                    <svg
                      width="10"
                      height="15"
                      viewBox="0 0 10 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.00065 0.97998C2.42065 0.97998 0.333984 3.06665 0.333984 5.64665C0.333984 9.14665 5.00065 14.3133 5.00065 14.3133C5.00065 14.3133 9.66732 9.14665 9.66732 5.64665C9.66732 3.06665 7.58065 0.97998 5.00065 0.97998ZM1.66732 5.64665C1.66732 3.80665 3.16065 2.31331 5.00065 2.31331C6.84065 2.31331 8.33398 3.80665 8.33398 5.64665C8.33398 7.56665 6.41398 10.44 5.00065 12.2333C3.61398 10.4533 1.66732 7.54665 1.66732 5.64665Z"
                        fill="#0B7077"
                      />
                      <path
                        d="M5.00065 7.31331C5.92113 7.31331 6.66732 6.56712 6.66732 5.64665C6.66732 4.72617 5.92113 3.97998 5.00065 3.97998C4.08018 3.97998 3.33398 4.72617 3.33398 5.64665C3.33398 6.56712 4.08018 7.31331 5.00065 7.31331Z"
                        fill="#0B7077"
                      />
                    </svg>
                    <div className="text-[#0B7077]">Location</div>
                    <div className="text-[#48484A]">Ikeja, Lagos</div>
                  </div>
                  <div className="grid grid-rows-1 gap-1">
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99935 0.646484L0.666016 4.64648L3.33268 6.09982V10.0998L7.99935 12.6465L12.666 10.0998V6.09982L13.9993 5.37315V9.97982H15.3327V4.64648L7.99935 0.646484ZM12.546 4.64648L7.99935 7.12648L3.45268 4.64648L7.99935 2.16648L12.546 4.64648ZM11.3327 9.30648L7.99935 11.1265L4.66602 9.30648V6.82648L7.99935 8.64648L11.3327 6.82648V9.30648Z"
                        fill="#0B7077"
                      />
                    </svg>
                    <div className="text-[#0B7077]">Career Area</div>
                    {company.courseAreas && (
                      <div className="text-[#48484A]">{company.courseAreas.join(', ')}</div>
                    )}
                  </div>
                  <div className="grid grid-rows-1 gap-1">
                    <svg
                      width="16"
                      height="11"
                      viewBox="0 0 16 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1127 6.39966C12.026 7.01966 12.666 7.85966 12.666 8.97966V10.9797H15.3327V8.97966C15.3327 7.52632 12.9527 6.66632 11.1127 6.39966Z"
                        fill="#0B7077"
                      />
                      <path
                        d="M9.99935 5.64632C11.4727 5.64632 12.666 4.45299 12.666 2.97966C12.666 1.50632 11.4727 0.312988 9.99935 0.312988C9.68602 0.312988 9.39268 0.379655 9.11268 0.472988C9.66602 1.15965 9.99935 2.03299 9.99935 2.97966C9.99935 3.92632 9.66602 4.79966 9.11268 5.48632C9.39268 5.57966 9.68602 5.64632 9.99935 5.64632Z"
                        fill="#0B7077"
                      />
                      <path
                        d="M5.99935 5.64632C7.47268 5.64632 8.66602 4.45299 8.66602 2.97966C8.66602 1.50632 7.47268 0.312988 5.99935 0.312988C4.52602 0.312988 3.33268 1.50632 3.33268 2.97966C3.33268 4.45299 4.52602 5.64632 5.99935 5.64632ZM5.99935 1.64632C6.73268 1.64632 7.33268 2.24632 7.33268 2.97966C7.33268 3.71299 6.73268 4.31299 5.99935 4.31299C5.26602 4.31299 4.66602 3.71299 4.66602 2.97966C4.66602 2.24632 5.26602 1.64632 5.99935 1.64632Z"
                        fill="#0B7077"
                      />
                      <path
                        d="M5.99935 6.31299C4.21935 6.31299 0.666016 7.20632 0.666016 8.97966V10.9797H11.3327V8.97966C11.3327 7.20632 7.77935 6.31299 5.99935 6.31299ZM9.99935 9.64632H1.99935V8.98632C2.13268 8.50632 4.19935 7.64632 5.99935 7.64632C7.79935 7.64632 9.86602 8.50632 9.99935 8.97966V9.64632Z"
                        fill="#0B7077"
                      />
                    </svg>
                    <div className="text-[#0B7077]">Total Applications</div>
                    <div className="text-[#48484A]">12,000 Applicants</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 mb-3">
                  <div className="flex items-center text-center text-[#FF9500] font-bold">
                    2 vacancies
                  </div>
                  <div className="col-span-2">
                    <Link href={`/student/companies/${id}/apply`}>
                      <button className="w-full rounded p-3 bg-[#0B7077] text-white text-center">
                        Apply Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mb-3">
                  <h5 className="text-black mb-3 font-bold text-xs">Requirements</h5>
                  <div className="text-[#8E8E93] text-xs">
                    <p className="mb-2">
                      To apply for your SIWES placement at CMR Shopping Mall, applicants must meet
                      the following requirements:
                    </p>
                    <ul className="list-disc">
                      <li className="ms-4 mb-2">
                        Educational Background: Currently enrolled in a tertiary institution
                        (University, Polytechnic, or College of Education) and studying a relevant
                        course such as Business Administration, Marketing, Accounting, or any
                        related field.
                      </li>
                      <li className="ms-4 mb-2">
                        SIWES Eligibility: Must be approved for SIWES by your institution and
                        provide proof of eligibility, such as an SIWES introductory letter from your
                        school.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-3">
                  <h5 className="text-black mb-3 font-bold text-xs">More Suggestions</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <CompanySuggestionCard />
                    <CompanySuggestionCard />
                    <CompanySuggestionCard />
                    <CompanySuggestionCard />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block rounded-lg bg-[#EBE7E77A] flex p-5">
                <Image className="m-auto" src={advertText} alt="advert-text" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page
