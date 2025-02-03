import React from 'react'

export default function ReportDailyCard({ time }: { time: string }) {
  return (
    <div className="p-2 border border-[#F1F1F1] rounded">
      <h5 className="text-black">Prepare a Market Analysis Report</h5>
      <span className="text-[#8E8E93]">By Fredrick Precious</span>
      <div className="p-2 bg-[#FAFAFA] rounded mt-2">
        <h5 className="text-black">Review</h5>
        <span className="text-[#8E8E93]">Student is doing well.</span>
      </div>
      <div className="text-right mt-2">
        <span className="text-[#48484A] text-xs">{time}</span>
      </div>
    </div>
  )
}
