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
                    <h5 className="text-black font-bold">Declined Invites</h5>
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
                  <h5 className="text-black font-bold mb-3">Declined Message</h5>
                  <p className="text-[#8E8E93] mb-3">{interviewInvitation.declineReason}</p>
                </div>
                <div className="grid grid-rows-1 gap-1">
                  <div className="text-[#0B7077]">Decline Time</div>
                  <div className="text-[#48484A]">{formatDate(interviewInvitation.updatedAt)}</div>
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
