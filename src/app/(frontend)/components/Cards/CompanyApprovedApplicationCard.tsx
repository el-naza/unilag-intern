'use client'

import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import companyBanner from '@/app/(frontend)/assets/images/company-banner.svg'
import companyLogo from '@/app/(frontend)/assets/images/company-logo.svg'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { InterviewInvitation } from '@/payload-types'
import formatDate from '@/utilities/formatDate'
import { toast } from 'sonner'
import Spinner from '@/components/spinner'

interface Props {
  interviewInvitation: InterviewInvitation
  onRespond: (value: InterviewInvitation) => Promise<void>
}

export default function CompanyApprovedApplicationCard({ interviewInvitation, onRespond }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [openAlt, setOpenAlt] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [declineReason, setDeclineReason] = useState<string>('')

  const action = useMemo(
    (): 'Accept' | 'Decline' => (interviewInvitation.status === 'declined' ? 'Accept' : 'Decline'),
    [interviewInvitation],
  )

  const handleDeclineReasonInput = (e: any) => {
    setDeclineReason(e.target.value)
  }

  const acceptInterview = async () => {
    setSubmitting(true)
    await onRespond({
      ...interviewInvitation,
      status: 'accepted',
    })
    setSubmitting(false)
    setOpen(false)
    toast.success('Invitation accepted successfully')
  }

  const declineInterview = async () => {
    setSubmitting(true)
    await onRespond({
      ...interviewInvitation,
      status: 'declined',
      declineReason,
    })
    setDeclineReason('')
    setSubmitting(false)
    setOpen(false)
    toast.success('Invitation declined successfully')
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 rounded-lg border border-[#F1F1F1]">
      <Image
        height={150}
        width={100}
        className="rounded-tl-lg rounded-bl-lg h-full w-full"
        src={
          interviewInvitation.company?.image
            ? interviewInvitation.company?.image?.url
            : companyBanner
        }
        alt="company-banner"
      />
      <div className="col-span-3 grid sm:col-span-5 p-1">
        <div className="mt-auto sm:my-auto">
          <div className="ms-2 leading-normal">
            <h5 className="text-black mb-0 text-[12px]">{interviewInvitation.company.name}</h5>
            <p className="text-[10px] text-[#8E8E93]">
              Career Area: {interviewInvitation.company.courseAreas}
            </p>
            <p className="text-[10px] text-[#8E8E93]">
              Interview Scheduled: {formatDate(interviewInvitation.dateTime)}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <Dialog open={openAlt} onOpenChange={setOpenAlt}>
              <DialogTrigger asChild>
                <button className="text-[10px] w-full rounded p-1 bg-[#0B7077] text-white text-center">
                  View Details
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg gap-2">
                <DialogTitle className="text-[#0B7077] font-normal">Interview Details</DialogTitle>
                <div className="my-3">
                  <div className="grid grid-cols-8 mb-3 gap-2">
                    <div className="flex items-center">
                      <Image
                        width={40}
                        height={40}
                        src={
                          interviewInvitation.company?.image
                            ? interviewInvitation.company?.image?.url
                            : companyLogo
                        }
                        alt="company-logo"
                      />
                    </div>
                    <div className="col-span-7">
                      <h5 className="text-black font-bold">{interviewInvitation.company.name}</h5>
                      <span className="text-[#8E8E93] text-xs">
                        {interviewInvitation.company.cac}
                      </span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h5 className="text-black font-bold mb-3">Acceptance Message</h5>
                    <p className="text-[#8E8E93] mb-3">{interviewInvitation.message}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div className="grid grid-rows-1 gap-1">
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
                      <div className="text-[#0B7077]">Interview Time</div>
                      <div className="text-[#48484A]">
                        {formatDate(interviewInvitation.dateTime)}
                      </div>
                    </div>
                    <div className="grid grid-rows-1 gap-1">
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
                      <div className="text-[#48484A]">{interviewInvitation.company.address}</div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="grid grid-cols-4 gap-1">
                  <DialogClose className="col-start-4 text-xs bg-white text-[#48484A] border-0">
                    Close
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="text-[10px] w-full rounded p-1 bg-[#ECECEC] text-[#48484A] text-center">
                  {action} Invitation
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg gap-2">
                <DialogTitle className="text-[#0B7077] font-normal">{action} Interview</DialogTitle>
                {interviewInvitation.status !== 'declined' && (
                  <>
                    <DialogDescription className="text-[#8E8E93]">
                      Reason for {action}
                    </DialogDescription>
                    <div className="grid gap-4 text-center">
                      <textarea
                        onChange={handleDeclineReasonInput}
                        className="text-sm w-full placeholder:text-[#ECECEC] p-2 border border-[#ECECEC] rounded mb-2"
                        rows={5}
                        placeholder="Enter Reason"
                      ></textarea>
                    </div>
                  </>
                )}
                <DialogFooter className="grid grid-cols-4 gap-1">
                  <DialogClose className="col-start-2 text-xs bg-white text-[#48484A] border-0">
                    Cancel
                  </DialogClose>
                  <button
                    disabled={submitting}
                    onClick={
                      interviewInvitation.status !== 'declined' ? declineInterview : acceptInterview
                    }
                    className="w-full flex disabled:opacity-50 items-center col-span-2 rounded p-2 text-xs bg-[#0B7077] text-white text-center"
                  >
                    <div className="flex m-auto">
                      <span>Continue</span> {submitting && <Spinner className="ms-1 h-4" />}
                    </div>
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
