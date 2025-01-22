'use client'

import { Slider } from '@/components/ui/slider'
import { useRouter } from 'next/navigation'
import React from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen relative text-sm text-white">
      <div className="bg-[#195F7E] container pt-4 pb-1">
        <StudentHeader />
        <StudentNavbar />
      </div>
      <div className="container">
        <main className="py-1 bg-white">
          <div className="mb-1" onClick={() => router.push('/student/companies/1')}>
            <iframe
              className="w-full rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7193.3143200417435!2d-100.28889498759587!3d25.649501748537784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bfbef1c51a37%3A0x2aeb9d19e4fbb44b!2sCentro%20Deportivo%20Borregos%20II!5e0!3m2!1sen!2sng!4v1736921701249!5m2!1sen!2sng"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <h5 className="text-black mb-3 font-bold">Company Search</h5>
            <div className="relative p-2 border border-[#F1F1F1] rounded mb-2">
              <svg
                className="absolute left-1.5 top-2.5"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99935 5.97917C6.52602 5.97917 5.33268 7.1725 5.33268 8.64583C5.33268 10.1192 6.52602 11.3125 7.99935 11.3125C9.47268 11.3125 10.666 10.1192 10.666 8.64583C10.666 7.1725 9.47268 5.97917 7.99935 5.97917ZM13.9593 7.97917C13.6527 5.19917 11.446 2.9925 8.66602 2.68583V1.3125H7.33268V2.68583C4.55268 2.9925 2.34602 5.19917 2.03935 7.97917H0.666016V9.3125H2.03935C2.34602 12.0925 4.55268 14.2992 7.33268 14.6058V15.9792H8.66602V14.6058C11.446 14.2992 13.6527 12.0925 13.9593 9.3125H15.3327V7.97917H13.9593ZM7.99935 13.3125C5.41935 13.3125 3.33268 11.2258 3.33268 8.64583C3.33268 6.06583 5.41935 3.97917 7.99935 3.97917C10.5793 3.97917 12.666 6.06583 12.666 8.64583C12.666 11.2258 10.5793 13.3125 7.99935 13.3125Z"
                  fill="#0B7077"
                />
              </svg>
              <input
                className="w-full text-xs indent-6 text-black placeholder:text-[#8E8E93] outline-none border-0"
                type="text"
                placeholder="Search Destination (Office Address, Cities or Towns)"
              />
            </div>
            <div className="relative p-2 border border-[#F1F1F1] rounded mb-2">
              <div className="text-xs text-[#8E8E93] mb-4">Distance Search</div>
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-4 grid-rows">
                  <div className="flex justify-between mb-2">
                    <div className="text-xs text-[#8E8E93]">0 km</div>
                    <div className="text-xs text-[#8E8E93]">100 km</div>
                  </div>
                  <Slider className="col-span-5 flex" defaultValue={[33]} max={100} step={1} />
                </div>
                <div className="border border-[#F1F1F1] text-xs text-[#0B7077] px-2 flex items-center">
                  0 km
                </div>
              </div>
            </div>
            <div>
              <button className="w-full rounded p-3 bg-[#0B7077] text-white text-center">
                Search Vacancies
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
