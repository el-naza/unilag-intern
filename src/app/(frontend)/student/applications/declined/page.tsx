'use client'

import React, { useEffect, useState } from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import CompanyApprovedApplicationCard from '@/app/(frontend)/components/Cards/CompanyApprovedApplicationCard'
import advertText from '../../../assets/images/adverts.png'
import Image from 'next/image'
import CompanyLargeApprovedApplicationCard from '@/app/(frontend)/components/Cards/CompanyLargeApprovedApplicationCard'
import Link from 'next/link'
import { InterviewInvitation } from '@/payload-types'
import fetchDocs from '@/services/fetchDocs'
import Loader from '@/app/(frontend)/components/Layouts/Loader'
import updateDoc from '@/services/updateDoc'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import StudentApplicationHeader from '@/app/(frontend)/components/Layouts/Student/StudentApplicationHeader'
import { stringify } from 'qs-esm'
import { Where } from 'payload'

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [interviewInvitations, setInterviewInvitations] = useState<InterviewInvitation[]>([])

  const fetchInterviewInvitations = async () => {
    const query: Where = { status: { equals: 'declined' } }

    const stringifiedQuery = stringify(
      {
        where: query,
      },
      { addQueryPrefix: true },
    )

    const res: any = await fetchDocs('interview-invitations', stringifiedQuery)
    console.log(res)
    setInterviewInvitations(res.docs)
    setLoading(false)
  }

  const respondToInterviewMtn = useMutation({
    mutationFn: async (interviewInvitation: InterviewInvitation) => {
      try {
        console.log(interviewInvitation)
        const res = await updateDoc(
          'interview-invitations',
          interviewInvitation.id,
          interviewInvitation,
        )
        console.log('res', res)
        if (!res) return toast.error('Network err; pls try again later')
        return res
      } catch {
        toast.error('An error occured while updating; pls try again later')
      }
    },
  })

  const handleRespond = async (value: InterviewInvitation) => {
    await respondToInterviewMtn.mutateAsync(value)
    await fetchInterviewInvitations()
  }

  useEffect(() => {
    fetchInterviewInvitations()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-white bg-white lg:bg-[#195F7E] py-0 lg:py-20">
          <div className="lg:hidden block">
            <div className="bg-[#195F7E] container pt-4 pb-1">
              <StudentHeader />
              <StudentNavbar />
            </div>
            <div className="container">
              <main className="py-1 bg-white text-sm">
                <div className="mt-1 mb-3">
                  <h6 className="text-[#48484A]">Declined Interviews</h6>
                </div>
                <div className="grid gap-4">
                  {interviewInvitations.map((interviewInvitation) => (
                    <CompanyApprovedApplicationCard
                      interviewInvitation={interviewInvitation}
                      key={interviewInvitation.id}
                      onRespond={handleRespond}
                    />
                  ))}
                </div>
              </main>
            </div>
          </div>
          <div className="lg:block hidden h-full">
            <div className="container">
              <div className="flex mb-2 items-baseline">
                <Link href={'/student'}>
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
                <div className="text-white text-3xl font-bold ms-4">Declined Interviews</div>
              </div>
              <div className="text-black bg-white rounded-lg">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-4">
                    <div className="p-5">
                      <StudentApplicationHeader />
                      <div className="grid gap-4">
                        {interviewInvitations.map((interviewInvitation) => (
                          <CompanyLargeApprovedApplicationCard
                            interviewInvitation={interviewInvitation}
                            key={interviewInvitation.id}
                            onRespond={handleRespond}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-rows-2 gap-4">
                    <div className="rounded-lg bg-[#EBE7E77A] flex p-5">
                      <Image className="m-auto" src={advertText} alt="advert-text" />
                    </div>
                    <div className="rounded-lg bg-[#EBE7E77A] flex p-5">
                      <Image className="m-auto" src={advertText} alt="advert-text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
