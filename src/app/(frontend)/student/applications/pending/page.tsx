'use client'

import React from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import CompanyPendingApplicationCard from '@/app/(frontend)/components/Cards/CompanyPendingApplicationCard'

export default function Page() {
  return (
    <div className="min-h-screen relative text-sm text-white">
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
            <CompanyPendingApplicationCard />
            <CompanyPendingApplicationCard />
            <CompanyPendingApplicationCard />
          </div>
        </main>
      </div>
    </div>
  )
}
