'use client'

import Image from 'next/image'
import React from 'react'
import companyBanner from '@/app/(frontend)/assets/images/company-banner.svg'
import Link from 'next/link'
import { InterviewInvitation } from '@/payload-types'
import formatTime from '@/utilities/formatTime'

interface Props {
  interviewInvitation: InterviewInvitation
}

export default function CompanyDeclinedApplicationCard({ interviewInvitation }: Props) {
  return (
    <Link href={`/student/applications/declined/${interviewInvitation.id}`}>
      <div className="grid grid-cols-4 sm:grid-cols-6 rounded-lg border border-[#F1F1F1] pointer">
        <Image
          height={150}
          width={100}
          className="rounded-tl-lg rounded-bl-lg h-full w-full"
          src={companyBanner}
          alt="company-banner"
        />
        <div className="col-span-3 sm:col-span-5 grid p-1">
          <div className="mt-auto sm:my-auto">
            <div className="ms-2">
              <h5 className="text-black mb-0 text-[12px]">{interviewInvitation.company.name}</h5>
              <p className="text-[10px] text-[#8E8E93] mb-0 leading-normal">
                {interviewInvitation.declineReason}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[#48484A] text-[10px]">
                {formatTime(interviewInvitation.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
