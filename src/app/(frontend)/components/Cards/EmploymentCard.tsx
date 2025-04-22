import formatDate from '@/utilities/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmploymentCard = ({ company, status, student, onAccept, onCancel, loading, createdAt }) => {
  return (
    <div className="relative bg-[#EBE7E77A] rounded-[13px] pt-[64px] pl-[156px] pb-[125.33px] pr-[108px] font-poppins ml-[38px]">
      <Image
        src={company?.image?.url || '/company-logo.png'} // Fallback image if company image is not available
        alt="Company Logo"
        width={169}
        height={160}
        className="rounded-full absolute top-[42px] left-[-38px] w-[169px] h-[169px] object-cover border-2"
      />
      <h2 className="text-2xl font-bold font-nunito">{company.name}</h2>

      <div className="font-poppins flex gap-4 text-xs mb-[37px] mt-[28px] w-full">
        <div className="flex flex-col gap-1 min-w-[150px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 12.6667V2.66667H10V2H3.33333V12.6667H2V14H10V4H11.3333V14H14V12.6667H12.6667ZM8.66667 12.6667H4.66667V3.33333H8.66667V12.6667ZM6.66667 7.33333H8V8.66667H6.66667V7.33333Z"
              fill="#0B7077"
            />
          </svg>
          <div className="text-[#0B7077]">Time Sent</div>
          <div className="text-[#48484A]">{formatDate(createdAt)}</div>
        </div>
        <div className="grid grid-rows-1 gap-1 w-full">
          <svg
            width="10"
            height="15"
            viewBox="0 0 10 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.00065 0.97998C2.42065 0.97998 0.333984 3.06665 0.333984 5.64665C0.333984 9.14665 5.00065 14.3133 5.00065 14.3133C5.00065 14.3133 9.66732 9.14665 9.66732 5.64665C9.66732 3.06665 7.58065 0.97998 5.00065 0.97998ZM1.66732 5.64665C1.66732 3.80665 3.16065 2.31331 5.00065 2.31331C6.84065 2.31331 8.33398 3.80665 8.33398 5.64665C8.33398 7.56665 6.41398 10.44 5.00065 12.2333C3.61398 10.4533 1.66732 7.54665 1.66732 5.64665Z"
              fill="#0B7077"
            />
            <path
              d="M5.00065 7.31331C5.92113 7.31331 6.66732 6.56712 6.66732 5.64665C6.66732 4.72617 5.92113 3.97998 5.00065 3.97998C4.08018 3.97998 3.33398 4.72617 3.33398 5.64665C3.33398 6.56712 4.08018 7.31331 5.00065 7.31331Z"
              fill="#0B7077"
            />
          </svg>
          <div className="text-[#0B7077]">Location</div>
          <div className="text-[#48484A]">{company.address}</div>
        </div>
      </div>

      {/* <div className="font-poppins">
        <p className="text-gray-600">{company.address}</p>

        <p className="text-gray-500">Phone: {company.phone}</p>
        <p className="text-gray-500">Status: {status}</p>
        <p className="text-gray-700 font-medium mt-2">
          Student: {student.firstName} {student.lastName}
        </p>
      </div> */}

      <div className="flex gap-4 font-nunito">
        <button
          onClick={onAccept}
          className="bg-[#0B7077] text-white px-4 py-2 rounded-[8px] hover:bg-green-600 disabled:bg-green-300"
          disabled={loading}
        >
          {loading === 'Accept' ? 'Processing...' : 'Accept'}
        </button>
        <button
          onClick={onCancel}
          className="bg-[#A71C51] text-white px-4 py-2 rounded-[8px] hover:bg-red-600 disabled:bg-red-300"
          disabled={loading}
        >
          {loading === 'Decline' ? 'Processing...' : 'Decline'}
        </button>
      </div>
    </div>
  )
}

export default EmploymentCard
