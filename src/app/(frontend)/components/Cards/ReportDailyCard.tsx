import { Report } from '@/payload-types'
import { format } from 'date-fns'
import React from 'react'

export default function ReportDailyCard(report: Report) {
  return (
    <div className="p-2 border border-[#F1F1F1] rounded">
      <h5 className="text-black">{report.title}</h5>
      <span className="text-[#8E8E93]">{report.details}</span>
      {/* <span className="text-[#8E8E93]">By Fredrick Precious</span> */}
      <div className="p-2 bg-[#FAFAFA] rounded mt-2">
        <h5 className="text-black">Review</h5>
        <span className="text-[#8E8E93]">{report.remark || 'No reviews yet'}</span>
      </div>
      <div className="text-right mt-2">
        <span className="text-[#48484A] text-xs">
          {format(new Date(report.createdAt), 'h:mm a')}
        </span>
      </div>
    </div>
  )
}
