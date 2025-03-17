import React from 'react'
import ReportDailyCard from '../../components/Cards/ReportDailyCard'

export default async function Page() {
  return (
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
  )
}
