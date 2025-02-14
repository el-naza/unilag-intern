'use client'

import Loader from '@/app/(frontend)/components/Layouts/Loader'
import { InterviewInvitation } from '@/payload-types'
import fetchDoc from '@/services/fetchDoc'
import formatDate from '@/utilities/formatDate'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { id }: { id: string } = useParams()
  const [interviewInvitation, setInterviewInvitation] = useState<InterviewInvitation>({})
  const [loading, setLoading] = useState<boolean>(true)

  const fetchInterviewInvitation = async () => {
    const res: any = await fetchDoc('interview-invitations', id)
    setInterviewInvitation(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchInterviewInvitation()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-black">
          <div className="container">
            <main className="py-1 bg-white">
              <div>
                <div className="flex justify-between my-3">
                  <div>
                    <h5 className="text-black font-bold">Approved Invitations</h5>
                  </div>
                </div>
                <div className="grid grid-cols-8 mb-3 gap-2">
                  <div className="flex items-center">
                    <Image width={40} height={40} src="/cmr-logo.png" alt="cmr-logo" />
                  </div>
                  <div className="col-span-7">
                    <h5 className="text-black font-bold">{interviewInvitation.company.name}</h5>
                    <span className="text-[#8E8E93] text-xs">
                      {interviewInvitation.company.cac}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <h5 className="text-black font-bold mb-3">Acceptance Message</h5>
                  <p className="text-[#8E8E93] mb-3">{interviewInvitation.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                  <div className="grid grid-rows-1 gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.6667 12.6667V2.66667H10V2H3.33333V12.6667H2V14H10V4H11.3333V14H14V12.6667H12.6667ZM8.66667 12.6667H4.66667V3.33333H8.66667V12.6667ZM6.66667 7.33333H8V8.66667H6.66667V7.33333Z"
                        fill="#0B7077"
                      />
                    </svg>
                    <div className="text-[#0B7077]">Interview Time</div>
                    <div className="text-[#48484A]">{formatDate(interviewInvitation.dateTime)}</div>
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
                    <div className="text-[#48484A]">{interviewInvitation.company.address}</div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
