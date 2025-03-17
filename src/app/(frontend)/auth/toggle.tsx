'use client' // Ensure it's a Client Component

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // usePathname instead of useRouter
import Image from 'next/image'
import authLine from '@/app/(frontend)/assets/images/auth-line.svg'

export default function ToggleButtons() {
  const pathname = usePathname() // Get current route
  const [activeTab, setActiveTab] = useState('')

  const tabs = [
    { label: 'SIWES', link: '/auth/login' },
    { label: 'OTHER INTERNS', link: '/auth/sign-up/siwes-applicant' },
    { label: 'LECTURER', link: '/auth/lecturer' },
  ]

  // Set active tab based on URL
  useEffect(() => {
    const foundTab = tabs.find((tab) => pathname.startsWith(tab.link))
    console.log(foundTab)

    if (foundTab) {
      setActiveTab(foundTab.label)
    }
  }, [pathname])

  return (
    <div className="grid gap-5 min-w-[300px]">
      {tabs.map((tab, index) => (
        <Link key={tab.label} href={tab.link} passHref>
          <div
            onClick={() => setActiveTab(tab.label)}
            className="grid grid-cols-5 gap-4 cursor-pointer relative group"
          >
            {index < tabs.length - 1 && (
              <Image className="top-[62px] left-[22px] absolute" src={authLine} alt="auth-line" />
            )}
            <div className="m-auto">
              <div className="relative h-[50px] w-[50px] rounded-full border-4 border-white bg-transparent flex items-center justify-center">
                <div
                  className={`h-[30px] w-[30px] rounded-full border-4 border-white transition ${
                    activeTab === tab.label ? 'bg-white' : 'hidden group-hover:block'
                  }`}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div
                className={`rounded-lg p-5 transition-colors ${
                  activeTab === tab.label
                    ? 'text-black bg-white'
                    : 'text-white bg-[#0B7077] hover:text-black hover:bg-white'
                }`}
              >
                <span className="text-xl">{tab.label}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
