'use client'

import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import companyBanner from '@/app/(frontend)/assets/images/company-banner.svg'
import Link from 'next/link'
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
        src={interviewInvitation.company?.image ? interviewInvitation.company?.image?.url || companyBanner}
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
            <Link href={`/student/applications/approved/${interviewInvitation.id}`}>
              <button className="text-[10px] w-full rounded p-1 bg-[#0B7077] text-white text-center">
                View Details
              </button>
            </Link>
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
