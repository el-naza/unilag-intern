'use client'

import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import companyLogo from '@/app/(frontend)/assets/images/company-logo.svg'
import { InterviewInvitation } from '@/payload-types'
import formatDate from '@/utilities/formatDate'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import Spinner from '@/components/spinner'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

interface Props {
  interviewInvitation: InterviewInvitation
  onRespond: (value: InterviewInvitation) => Promise<void>
}

export default function CompanyLargeApprovedApplicationCard({
  interviewInvitation,
  onRespond,
}: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const [open2, setOpen2] = useState<boolean>(false)
  const [openAlt, setOpenAlt] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [declineReason, setDeclineReason] = useState<string>('')
  const [action, setAction] = useState<string>('Accept')

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
    setOpen2(false)
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
    setOpen2(false)
    toast.success('Invitation declined successfully')
  }

  return (
    <div className="bg-[#EBE7E77A] rounded-lg p-10 ps-0">
      <div className="grid grid-cols-10">
        <div>
          <Image
            src={
              interviewInvitation.company?.image
                ? interviewInvitation.company?.image?.url
                : companyLogo
            }
            alt="company-logo"
          />
        </div>
        <div className="col-span-6">
          <div>
            <h5 className="text-lg mb-6 font-medium">{interviewInvitation.company.name}</h5>
            <div className="mb-6">
              <h5 className="text-black font-medium mb-3">Acceptance Message</h5>
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
                <div className="text-[#48484A]">{formatDate(interviewInvitation.dateTime)}</div>
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
              <div>
                <Dialog open={openAlt} onOpenChange={setOpenAlt}>
                  <DialogTrigger asChild>
                    <button className="bg-[#9597A7] rounded-lg p-2 min-w-40">
                      <span className="text-white text-sm">View Details</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg gap-2">
                    <DialogTitle className="text-[#0B7077] font-normal">
                      Interview Details
                    </DialogTitle>
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
                          <h5 className="text-black font-bold">
                            {interviewInvitation.company.name}
                          </h5>
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
                          <div className="text-[#48484A]">
                            {interviewInvitation.company.address}
                          </div>
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
              </div>
              {pathname === '/student/applications/interviews' ? (
                <div className="grid grid-cols-2 gap-2">
                  <Dialog open={open2} onOpenChange={setOpen2}>
                    {/* <DialogTrigger asChild>
                      <button
                        onClick={() => setAction('Accept')}
                        className="bg-primary rounded-lg p-2 min-w-40"
                      >
                        <span className="text-white text-sm">Accept</span>
                      </button>
                    </DialogTrigger> */}
                    <DialogContent className="bg-white rounded-lg gap-2">
                      <DialogTitle className="text-[#0B7077] font-normal">
                        Accept Invitation
                      </DialogTitle>
                      <DialogFooter className="grid grid-cols-5 gap-1">
                        <DialogClose className="col-start-3 text-xs bg-white text-[#48484A] border-0">
                          Cancel
                        </DialogClose>
                        <button
                          disabled={submitting}
                          onClick={acceptInterview}
                          className="w-full flex disabled:opacity-50 items-center col-span-2 rounded p-2 text-xs bg-[#0B7077] text-white text-center"
                        >
                          <div className="flex m-auto">
                            <span>Continue</span> {submitting && <Spinner className="ms-1 h-4" />}
                          </div>
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setAction('Decline')}
                        className="bg-[#A71C51] rounded-lg p-2 min-w-40"
                      >
                        <span className="text-white text-sm">Decline</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white rounded-lg gap-2">
                      <DialogTitle className="text-[#0B7077] font-normal">
                        Decline Invitation
                      </DialogTitle>
                      {/* {interviewInvitation.status !== 'declined' && ( */}
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
                      {/* )} */}
                      <DialogFooter className="grid grid-cols-5 gap-1">
                        <DialogClose className="col-start-3 text-xs bg-white text-[#48484A] border-0">
                          Cancel
                        </DialogClose>
                        <button
                          disabled={submitting}
                          onClick={declineInterview}
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
