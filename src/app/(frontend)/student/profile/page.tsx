'use client'

import React, { useMemo } from 'react'
import ProfilePicture from '../../assets/icons/profilepicture'
import Bitmoji from '../../assets/icons/bitmoji'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import getAge from '@/utilities/getAge'

const Page = () => {
  const { data: session } = useSession()

  const user = useMemo<any>(() => session?.user, [session])

  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          {user && (
            <div>
              <div className="flex justify-between my-3">
                <div>
                  <h5 className="text-black font-bold">Profile</h5>
                </div>
                <div>
                  <Link href="/student/profile/bank-settings">
                    <span className="text-[#0B7077]">Banking Info</span>
                  </Link>
                </div>
              </div>
              <div className="my-5">
                <div className="flex items-center">
                  <div className="mx-auto">
                    <ProfilePicture />
                    <span className="font-oleo text-lg">{`${user.firstName} ${user.lastName}`}</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h5 className="text-black font-medium">Matriculation Number</h5>
                <p className="text-[#8E8E93] mb-3">{user.matricNo}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">Email</h5>
                <p className="text-[#8E8E93] mb-3">Oniadedolapo@gmail.com</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">Date of Birth</h5>
                <p className="text-[#8E8E93] mb-3">{user.dob.slice(0, 10)}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">Nationality</h5>
                <p className="text-[#8E8E93] mb-3">{user.nationality}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">State of Origin</h5>
                <p className="text-[#8E8E93] mb-3">{user.stateOfOrigin}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">Gender</h5>
                <p className="text-[#8E8E93] mb-3">{user.gender}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">Course of Study</h5>
                <p className="text-[#8E8E93] mb-3">{user.course}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-black font-medium">Home Address</h5>
                <p className="text-[#8E8E93] mb-3">{user.homeAddress}</p>
              </div>

              <div className="mt-5 mb-3">
                <div className="p-4 rounded bg-[#B3FAFF]">
                  <div className="grid grid-cols-6 mb-3">
                    <Bitmoji />
                    <div className="col-span-5">
                      <h5 className="text-[#0B7077] font-bold">You’re out of points?</h5>
                      <span className="text-[#48484A] font-medium">
                        Unlock more now and keep your opportunities flowing!
                      </span>
                    </div>
                  </div>
                  <Link href="/student/pricing">
                    <button className="w-full rounded-lg p-3 bg-[#0B7077] text-white text-center">
                      Purchase Points
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Page
