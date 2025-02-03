import Image from 'next/image'
import React from 'react'

export default async function Page() {
  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          <div>
            <div className="flex justify-between my-3">
              <div>
                <h5 className="text-black font-bold">Declined Invites</h5>
              </div>
            </div>
            <div className="grid grid-cols-8 mb-3 gap-2">
              <div className="flex items-center">
                <Image width={40} height={40} src="/cmr-logo.png" alt="cmr-logo" />
              </div>
              <div className="col-span-7">
                <h5 className="text-black font-bold">CRM SHOPPING MALL</h5>
                <span className="text-[#8E8E93] text-xs">163889584994</span>
              </div>
            </div>
            <div className="mb-6">
              <h5 className="text-black font-bold mb-3">Declined Message</h5>
              <p className="text-[#8E8E93] mb-3">
                Thank you for offering me the opportunity to join Company Name for my SIWES
                placement. I deeply appreciate the time and effort invested in reviewing my
                application and extending the invitation.
                <br />
                <br />
                After careful consideration, I have decided to pursue another opportunity that
                aligns more closely with my career goals and academic requirements. Please know that
                this decision was not an easy one, as I hold your company in high regard.
                <br />
                <br />
                Thank you once again for the opportunity, and I hope to have the chance to
                collaborate with your esteemed organization in the future.
              </p>
            </div>
            <div className="grid grid-rows-1 gap-1">
              <div className="text-[#0B7077]">Decline Time</div>
              <div className="text-[#48484A]">10:30am, 25th July 2025</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
