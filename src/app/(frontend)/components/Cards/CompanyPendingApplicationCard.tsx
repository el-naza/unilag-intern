import Image from 'next/image'
import React, { useState } from 'react'
import companyBanner from '@/app/(frontend)/assets/images/company-banner.svg'
import Link from 'next/link'
import deleteDoc from '@/services/deleteDoc'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

export default function CompanyPendingApplicationCard({ application, onDelete }) {
  const [open, setOpen] = useState(false)

  const cancelApplication = async () => {
    const res = await deleteDoc('internship-applications', application.id)
    console.log(res)
    toast.success('Deletion successful')
    onDelete()
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 rounded-lg border border-[#F1F1F1]">
      <Image
        height={150}
        width={100}
        className="rounded-tl-lg rounded-bl-lg h-full w-full"
        src={companyBanner}
        alt="company-banner"
      />
      <div className="col-span-3 sm:col-span-5 grid p-1">
        <div className="mt-auto sm:my-auto">
          <div className="ms-2">
            <h5 className="text-black mb-0 text-[12px]">{application.company.name}</h5>
            <p className="text-[10px] text-[#8E8E93] mb-0">
              Career Area: {application.company.courseAreas}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <button className="text-[10px] w-full rounded p-1 bg-[#ECECEC] text-[#48484A] text-center">
                  Cancel Application
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#FF3B30] text-start font-normal">
                    Cancel Application
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[#B7B7B7] text-start">
                    You are about to cancel this application
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid grid-cols-2 gap-2 items-center">
                  <AlertDialogCancel className="mt-0 text-[#48484A] border-0">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={cancelApplication}
                    className="text-white bg-[#FF3B30] hover:bg-[#FF3B30]"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link href={`/student/applications/pending/${application.id}`}>
              <button className="text-[10px] w-full rounded p-1 bg-[#0B7077] text-white text-center">
                View Application
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
