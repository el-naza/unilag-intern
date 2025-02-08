import Image from 'next/image'
import React from 'react'
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

export default function CompanyApprovedApplicationCard() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 rounded-lg border border-[#F1F1F1]">
      <Image
        height={150}
        width={100}
        className="rounded-tl-lg rounded-bl-lg h-full w-full"
        src={companyBanner}
        alt="company-banner"
      />
      <div className="col-span-3 grid sm:col-span-5 p-1">
        <div className="mt-auto sm:my-auto">
          <div className="ms-2 leading-normal">
            <h5 className="text-black mb-0 text-[12px]">CMR SHOPPING MALL</h5>
            <p className="text-[10px] text-[#8E8E93]">Career Area: Marketing</p>
            <p className="text-[10px] text-[#8E8E93]">
              Interview Scheduled: 10:30am, 25th July 2025
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <Link href="/student/applications/approved/1">
              <button className="text-[10px] w-full rounded p-1 bg-[#0B7077] text-white text-center">
                View Details
              </button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] w-full rounded p-1 bg-[#ECECEC] text-[#48484A] text-center">
                  Decline Invitation
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg gap-2">
                <DialogTitle className="text-[#0B7077] font-normal">Reject Student</DialogTitle>
                <DialogDescription className="text-[#8E8E93]">
                  Reason for Rejection
                </DialogDescription>
                <div className="grid gap-4 text-center">
                  <textarea
                    className="text-sm w-full placeholder:text-[#ECECEC] p-2 border border-[#ECECEC] rounded mb-2"
                    rows={5}
                    placeholder="Enter Reason"
                  ></textarea>
                </div>
                <DialogFooter className="grid grid-cols-4 gap-1">
                  <DialogClose className="col-start-3 text-xs bg-white text-[#48484A] border-0">
                    Cancel
                  </DialogClose>
                  <button className="w-full rounded p-2 text-xs bg-[#0B7077] text-white text-center">
                    Continue
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
