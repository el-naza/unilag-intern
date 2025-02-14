'use client'

import React, { useEffect, useState } from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import CompanyDeclinedApplicationCard from '@/app/(frontend)/components/Cards/CompanyDeclinedApplicationCard'
import fetchInterviewInvitations from '@/services/fetchInterviewInvitations'
import { InterviewInvitation } from '@/payload-types'
import Loader from '@/app/(frontend)/components/Layouts/Loader'

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [declinedInterviewInvitations, setDeclinedInterviewInvitations] = useState<
    InterviewInvitation[]
  >([])

  const fetchDeclinedInterviewInvitations = async () => {
    const res: any = await fetchInterviewInvitations({ status: 'declined' })

    setDeclinedInterviewInvitations(res.docs)
    setLoading(false)
  }

  useEffect(() => {
    fetchDeclinedInterviewInvitations()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-white">
          <div className="bg-[#195F7E] container pt-4 pb-1">
            <StudentHeader />
            <StudentNavbar />
          </div>
          <div className="container">
            <main className="py-1 bg-white text-sm">
              <div className="mt-1 mb-3">
                <h6 className="text-[#48484A]">Declined Invites</h6>
              </div>
              <div className="grid gap-4">
                {declinedInterviewInvitations.map((interviewInvitation) => (
                  <CompanyDeclinedApplicationCard
                    interviewInvitation={interviewInvitation}
                    key={interviewInvitation.id}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
