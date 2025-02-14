// 'use client'
// import Image from 'next/image'
// import MainButton from '../Ui/button'

// type awaitingInterviewCard = {
//   image: string
//   dateTime: string
//   status?: string
//   viewClick?: () => void
//   rescheduleClick?: () => void
// }

// type awaitingInterviewCardProps = {
//   awaitingInterview: awaitingInterviewCard
// }

// export default function AwaitingInterviewCard({ awaitingInterview }: awaitingInterviewCardProps) {
//   const { image, dateTime, status, viewClick, rescheduleClick } = awaitingInterview
//   return (
//     <div>
//       <h3 className="text-[#48484A] font-[400] text-[16px] mb-[15px]">{status}</h3>
//       <div
//         className="border border-[#F1F1F1] rounded-[8px] overflow-hidden lg:max-w-[414px] mb-4 px-[14px] py-[9px]"
//         // onClick={() => router.push('/company-pages/invitation-details')}
//       >
//         <div className="flex items-center gap-3 mb-[12px]">
//           <Image
//             src={image}
//             alt="awaiting"
//             width={44}
//             height={44}
//             className="overflow-hidden rounded-full"
//           />
//           <div>
//             <h4 className="font-[400] text-[14px] mb-[4px]">{dateTime}</h4>
//             <p className="font-[400] text-[12px] text-[#8E8E93]">{dateTime}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-[10px]">
//           <MainButton
//             title={status !== 'Completed Interview' ? 'View Deatils' : 'Accept as Intern'}
//             width="w-[fit-content]"
//             borderRadius="rounded"
//             fontWeight="font-[400]"
//             padding="px-[10px]"
//           />
//           <MainButton
//             title={status == 'Completed Interview' ? 'Accept Intern' : 'Reschedule '}
//             width="w-[fit-content]"
//             backgroundColor="bg-transparent"
//             fontWeight="font-[400]"
//             color={status == 'Completed Interview' ? 'text-[red]' : 'text-[#0B7077]'}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import Image from 'next/image'
import MainButton from '../Ui/button'

type AwaitingInterviewCardProps = {
  awaitingInterview: {
    image?: string
    dateTime?: string // Ensure this is an ISO string like "2024-02-12T10:00:00Z"
    status?: string
    firstName?: string
    lastName?: string
    viewClick?: () => void
    rescheduleClick?: () => void
  }
}

export default function AwaitingInterviewCard({ awaitingInterview }: AwaitingInterviewCardProps) {
  const { image, dateTime, status, firstName, lastName, viewClick, rescheduleClick } =
  awaitingInterview
const [isPast, setIsPast] = useState<boolean>(false)

useEffect(() => {
  if (dateTime) {
    const interviewDate = new Date(dateTime)
    const now = new Date()
    setIsPast(interviewDate < now)
  }
}, [dateTime])



  return (
    <div>
      {status && (
        <h3 className="text-[#48484A] font-[400] text-[16px] mb-[15px]">
          {isPast ? 'Completed interview' : 'Awaiting interview'}
        </h3>
      )}

      <div className="border border-[#F1F1F1] rounded-[8px] overflow-hidden lg:max-w-[414px] mb-4 px-[14px] py-[9px]">
        <div className="flex items-center gap-3 mb-[12px]">
          <Image
            src={image as string}
            alt="awaiting"
            width={44}
            height={44}
            className="overflow-hidden rounded-full"
          />
          <div>
            <h4 className="font-[400] text-[14px] mb-[4px]">
              {firstName} {lastName}
            </h4>

            <p className="font-[400] text-[12px] text-[#8E8E93]">
              {new Date(dateTime as string).toLocaleString()} {/* Formats date */}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <MainButton
            title={isPast ? 'Accept as Intern' : 'View Details'}
            // {status == 'accept' ? 'View Details' : 'Accept as Intern'}
            width="w-[fit-content]"
            borderRadius="rounded"
            fontWeight="font-[400]"
            padding="px-[10px]"
            handleClick={viewClick}
          />
          <MainButton
            title={isPast ? 'Decline' : 'Reshedule'}
            width="w-[fit-content]"
            backgroundColor="bg-transparent"
            fontWeight="font-[400]"
            color={isPast ? 'text-[red]' : 'text-[#0B7077]'}
            handleClick={isPast ? rescheduleClick : undefined}  // Disable if past
            // disabled={isPast} // Disable button if interview is in the past
          />
        </div>
      </div>
    </div>
  )
}
