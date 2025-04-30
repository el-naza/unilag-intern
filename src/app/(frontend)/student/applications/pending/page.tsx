'use client'

import React, { useEffect, useMemo, useState } from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import CompanyPendingApplicationCard from '@/app/(frontend)/components/Cards/CompanyPendingApplicationCard'
import Image from 'next/image'
import advertText from '../../../assets/images/adverts.png'
import Link from 'next/link'
import CompanyLargePendingApplicationCard from '@/app/(frontend)/components/Cards/CompanyLargePendingApplicationCard'
import { InternshipApplication, Student } from '@/payload-types'
import fetchDocs from '@/services/fetchDocs'
import Loader from '@/app/(frontend)/components/Layouts/Loader'
import StudentApplicationHeader from '@/app/(frontend)/components/Layouts/Student/StudentApplicationHeader'
import { useQuery } from '@tanstack/react-query'
import fetchMe from '@/services/fetchMe'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const [pendingApplications, setPendingApplications] = useState<InternshipApplication[]>([])
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => (await fetchMe('students'))?.user as Student | undefined,
  })

  const user = useMemo<any>(() => meQuery.data, [meQuery.data])

  const fetchPendingApplications = async () => {
    const res: any = await fetchDocs('internship-applications')
    console.log(res)
    const getPending = res.docs.filter(
      (p) => p.status === 'pending' && (p.student?.id === user?.id || p.student === user?.id),
    )

    setPendingApplications(getPending)
    setLoading(false)
  }

  useEffect(() => {
    fetchPendingApplications()
  }, [user])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-white bg-[#195F7E] py-4 lg:py-20">
          {/* <div className="lg:hidden block">
            <div className="bg-[#195F7E] container pt-4 pb-1">
              <StudentHeader />
              <StudentNavbar />
            </div>
            <div className="container">
              <main className="py-1 bg-white text-sm">
                <div className="mt-1 mb-3">
                  <h6 className="text-[#48484A]">Pending Applications</h6>
                </div>
                <div className="grid gap-4">
                  {pendingApplications.map((pendingApplication) => (
                    <CompanyPendingApplicationCard
                      key={pendingApplication.id}
                      application={pendingApplication}
                      onDelete={fetchPendingApplications}
                    />
                  ))}
                </div>
              </main>
            </div>
          </div> */}
          <div className="block h-full">
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
                <div className="text-white text-xl lg:text-3xl font-bold ms-4">My Applications</div>
              </div>
              <div className="text-black bg-white rounded-lg">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-5 lg:col-span-4">
                    <div className="p-2 lg:p-5">
                      <StudentApplicationHeader />
                      <div className="grid gap-4">
                        {pendingApplications.map((pendingApplication) => (
                          <CompanyLargePendingApplicationCard
                            key={pendingApplication.id}
                            application={pendingApplication}
                            onDelete={fetchPendingApplications}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:grid grid-rows-2 gap-4">
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
