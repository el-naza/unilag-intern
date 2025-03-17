import { Report } from '@/payload-types'
import formatDate from '@/utilities/formatDate'
import React from 'react'

export default function ReportDailyCard({ report }: { report: Report }) {
  return (
    <div className="p-2 border border-[#F1F1F1] rounded">
      <h5 className="text-black">{report.title}</h5>
      <p className="text-[#8E8E93]">{report.details}</p>
      <span className="text-[#8E8E93]">
        By {`${report.student.firstName} ${report.student.lastName}`}
      </span>
      <div className="p-2 bg-[#FAFAFA] rounded mt-2">
        <h5 className="text-black">Review</h5>
        {/* <span className="text-[#8E8E93]">Student is doing well.</span> */}
      </div>
      <div className="text-right mt-2">
        <span className="text-[#48484A] text-xs">{formatDate(report.createdAt)}</span>
      </div>
    </div>
  )
}
