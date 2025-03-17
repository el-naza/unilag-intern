'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ReportDailyCard from '../../components/Cards/ReportDailyCard'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(true)
  const [employments, setEmployments] = useState<any[]>([])

  const user = useMemo<any>(() => session?.user, [session])

  const fetchEmployments = async () => {
    const res: any = await fetchDocs('employments')
    console.log(res)
    setEmployments(res.docs)
    setLoading(false)
  }

  useEffect(() => {
    fetchEmployments()
  }, [user])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-black">
          <div className="container">
            <main className="py-1 bg-white">
              <div>
                <div className="flex justify-between mt-3 mb-6">
                  <div>
                    <h5 className="text-black font-bold">Records</h5>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="">
                    <div className="text-[#8E8E93] text-xs mb-2">Today</div>
                    <div className="grid gap-2">
                      <ReportDailyCard time="10:32 am" />
                      <ReportDailyCard time="1:32 am" />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-[#8E8E93] text-xs mb-2">Fri 24th March 2024</div>
                    <div className="grid gap-2">
                      <ReportDailyCard time="11:45 am" />
                    </div>
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
