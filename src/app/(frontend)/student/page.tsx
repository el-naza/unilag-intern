'use client'

import { Slider } from '@/components/ui/slider'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import headerVector from '@/app/(frontend)/assets/images/header-vector.png'
import Image from 'next/image'
import NavUnderlineLarge from '../assets/icons/navUnderlineLg'
import SearchIcon from '../assets/icons/search'
import LocationIcon from '../assets/icons/location'
import LocationPointerIcon from '../assets/icons/locationPointerIcon'
import studentAbstractVector from '../assets/images/student-abstract-vector.svg'
import SearchAltIcon from '../assets/icons/searchAltIcon'
import MenuIcon from '../assets/icons/menu'
import NotificationBellIcon from '../assets/icons/notificationBell'
import FilterAltIcon from '../assets/icons/filterAltIcon'
import CompanyRecommendedCard from '../components/Cards/CompanyRecommendedCard'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import getAge from '@/utilities/getAge'
import fetchDocs from '@/services/fetchDocs'
import { Companies } from '@/collections/Companies'

export default function Page() {
  const router = useRouter()
  const { data: session } = useSession()

  const [companies, setCompanies] = useState<any[]>([])

  const user = useMemo<any>(() => session?.user, [session])

  const fetchCompanies = async () => {
    const res: any = await fetchDocs('companies')
    setCompanies(res.docs)
  }

  useEffect(() => {
    fetchCompanies()
  }, [user])
  return (
    <>
      <div className="block lg:hidden min-h-screen relative text-sm text-white">
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
                <LocationPointerIcon className="absolute left-1.5 top-2.5" />
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
      <div className="lg:block hidden bg-[#195F7E] min-h-screen relative text-white">
        <Image
          src={studentAbstractVector}
          alt="student-abstract-vector"
          className="absolute top-[-50px] right-0 z-0"
        />

        <div className="container">
          <nav className="relative grid grid-cols-5 gap-2 py-4 z-10">
            <div className="flex items-center">
              <Image
                width={48}
                height={48}
                src="/unilag-logo.png"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
            </div>
            <div className="flex items-center">
              <span onClick={() => signOut()} className="font-oleo text-white text-3xl">
                Welcome {user.firstName}
              </span>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="relative w-3/4">
                <input
                  type="text"
                  placeholder="Search For Company"
                  className="w-full outline-none text-black px-4 py-3 rounded-xl border border-black placeholder:text-black text-sm"
                />
                <SearchAltIcon className='className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"' />
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex items-center">
                <div className="cursor-pointer hover:bg-black p-2 rounded">
                  <FilterAltIcon />
                </div>
              </div>
              <div className="flex items-center">
                <div className="cursor-pointer hover:bg-black p-2 rounded">
                  <NotificationBellIcon />
                </div>
              </div>
              <div className="flex items-center">
                <div className="cursor-pointer hover:bg-black p-2 rounded">
                  <MenuIcon />
                </div>
              </div>
            </div>
          </nav>
          <main className="py-4">
            <div className="grid sm:grid-cols-2 mb-4">
              <div>
                <div className="grid sm:grid-cols-3 gap-8">
                  <div>
                    <Image width={197} height={235} src="/smiling-woman.png" alt="smiling woman" />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="grid grid-rows-4 gap-1">
                      <div>
                        <span className="text-3xl font-bold">
                          {user.firstName} <span className="text-[#FFE75C]">{user.lastName}</span>
                        </span>
                        <span className="ms-4 text-[#FFE75C]">{getAge(user.dob)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <span className="">unilag {user.level}</span>
                        </div>
                        <div>
                          <span className="">{user.course}</span>
                        </div>
                      </div>
                      <div>
                        <span>{user.homeAddress}</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-[#0B7077] text-white px-4 py-2 rounded-2xl">
                          <span>0 Duration</span>
                        </div>
                        <div className="bg-[#FFD836] text-[#195F7E] px-4 py-2 rounded-2xl">
                          <span>Upgrade</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-5 rounded-xl bg-[#0B7077] gap-2 p-5 mb-4">
              <div className="col-span-4 self-center">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Link href="#" className="relative group block text-center">
                      <span className="text-xl">Google Map Search</span>
                      <NavUnderlineLarge />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/student/applications/pending"
                      className="relative group block text-center"
                    >
                      <span className="text-xl">Pending</span>
                      <NavUnderlineLarge />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/student/applications/approved"
                      className="relative group block text-center"
                    >
                      <span className="text-xl">Approved</span>
                      <NavUnderlineLarge />
                    </Link>
                  </div>
                  <div>
                    <Link href="/student" className="relative group block text-center">
                      <span className="text-xl">History</span>
                      <NavUnderlineLarge />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="z-10">
                <Link href="/student/reports/create">
                  <button className="text-[#0B7077] bg-white rounded px-4 py-2">Report Page</button>
                </Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-5 gap-4">
              <div className="">
                <div className="bg-white rounded-xl mb-4 p-5 grid grid-cols-6">
                  <Slider className="col-span-5" defaultValue={[33]} max={100} step={1} />
                  <span className="text-sm text-black text-right">km</span>
                </div>
                <div className="bg-white rounded-xl mb-4">
                  <div className="relative border-b py-2">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search Job"
                      className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                    />
                  </div>
                  <div className="relative py-2">
                    <div className="flex absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-[27px] w-[27px] rounded-full bg-[#dfe1fa]">
                      <LocationIcon className="m-auto" />
                    </div>
                    <input
                      type="text"
                      placeholder="Location"
                      className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                    />
                  </div>
                  <div className="pb-1 mx-1">
                    <button className="bg-[#195F7E] rounded-xl p-4 w-full">Search Job</button>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
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
            </div>
          </main>
        </div>
      </div>

      <div className="container my-10 lg:my-24">
        <div className="grid gap-4 lg:gap-10">
          <div className="text-center">
            <h4 className="text-xl lg:text-4xl text-[#FD661F] font-medium relative">
              Recommended Companies
              <Image
                className="absolute right-[32%] hidden lg:block"
                src={headerVector}
                alt="header-vector"
              />
            </h4>
          </div>
          <div className="grid lg:grid-cols-10">
            <div className="lg:col-start-2 lg:col-span-8 grid grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-5">
              <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                All Programmes
              </div>
              <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                Science
              </div>
              <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                Engineering
              </div>
              <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                Business
              </div>
              <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                Art
              </div>
              <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                Medicine
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-5">
            {companies.map((company) => (
              <CompanyRecommendedCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
