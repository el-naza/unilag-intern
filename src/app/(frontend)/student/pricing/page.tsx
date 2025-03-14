'use client'

import { Slider } from '@/components/ui/slider'
import React, { useMemo, useState } from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import Image from 'next/image'
import NavUnderlineLarge from '../../assets/icons/navUnderlineLg'
import studentAbstractVector from '../../assets/images/student-abstract-vector.svg'
import SearchAltIcon from '../../assets/icons/searchAltIcon'
import MenuIcon from '../../assets/icons/menu'
import NotificationBellIcon from '../../assets/icons/notificationBell'
import FilterAltIcon from '../../assets/icons/filterAltIcon'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import getAge from '@/utilities/getAge'

const Page = () => {
  const { data: session } = useSession()

  const [coins, setCoins] = useState<number[]>([20])

  const user = useMemo<any>(() => session?.user, [session])

  const coinsCount = useMemo<number>(() => (coins.length ? coins[0] : 0), [coins])
  return (
    <div>
      <div className="block lg:hidden min-h-screen relative text-sm text-white">
        <div className="bg-[#195F7E] container pt-4 pb-1">
          <StudentHeader />
          <StudentNavbar />
        </div>
        <div className="container">
          <main className="py-1">
            <div className="mb-1"></div>
            <div className="grid sm:grid-cols-5 gap-4">
              <div className="col-span-5">
                <div className="bg-white mt-4 text-black flex flex-wrap">
                  <div className={'w-full py-8'}>
                    <div className="text-center mb-5">
                      <div className="text-3xl font-bold text-[#0B7077] mb-4">
                        LAND MORE INTERNSHIPS OFFER
                      </div>
                      <div className="text-lg font-bold text-[#0B7077] mb-4">
                        Power Up With Coin
                      </div>
                      <div className="text-[#8E8E93]">
                        Start with free coins on us! Need more?
                        <br />
                        Purchase additional coins for uninterrupted access.
                      </div>
                    </div>
                    <div className="bg-[#EFEFEF] pb-8">
                      <div className="p-8">
                        <div className="mb-4">1 Coin = ₦100 </div>
                        <div className="flex justify-between">
                          <div>Pricing estimate</div>
                          <div>₦{coinsCount * 100}</div>
                        </div>
                      </div>
                      <div className="bg-[#FAFAFA] py-8 px-2">
                        <div className="grid grid-cols-12 gap-2 mb-5">
                          <div className="col-span-2">0</div>
                          <div className="col-span-8">
                            <Slider value={coins} onValueChange={setCoins} max={100} step={1} />
                          </div>
                          <div className="col-span-2 text-right">100</div>
                        </div>
                        <div className="mx-0 mb-6">
                          <div className="grid grid-cols-3 gap-2">
                            <div
                              onClick={() => setCoins([10])}
                              className={`${coinsCount === 10 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              10 Coins
                            </div>
                            <div
                              onClick={() => setCoins([20])}
                              className={`${coinsCount === 20 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              20 Coins
                            </div>
                            <div
                              onClick={() => setCoins([30])}
                              className={`${coinsCount === 30 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              30 Coins
                            </div>
                            <div
                              onClick={() => setCoins([50])}
                              className={`${coinsCount === 50 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              50 Coins
                            </div>
                            <div
                              onClick={() => setCoins([70])}
                              className={`${coinsCount === 70 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              70 Coins
                            </div>
                            <div
                              onClick={() => setCoins([80])}
                              className={`${coinsCount === 80 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              80 Coins
                            </div>
                            <div
                              onClick={() => setCoins([100])}
                              className={`${coinsCount === 100 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              100 Coins
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button className="bg-primary text-white py-4 px-6 rounded-lg">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

        <div>
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
                  Welcome {user?.firstName}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="relative w-3/4">
                  <input
                    type="text"
                    placeholder="Search For Companies"
                    className="w-full outline-none text-black px-4 py-3 rounded-xl border border-black placeholder:text-black text-sm"
                  />
                  <SearchAltIcon className='className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"' />
                </div>
              </div>
            </nav>
          </div>
          <main>
            <div className="container">
              <div className="grid sm:grid-cols-2 mb-4">
                <div>
                  <div className="grid sm:grid-cols-3 gap-8">
                    <div>
                      <Image
                        width={197}
                        height={235}
                        src="/smiling-woman.png"
                        alt="smiling woman"
                      />
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="grid grid-rows-4 gap-1">
                        <div>
                          <span className="text-3xl font-bold">
                            {user?.firstName}{' '}
                            <span className="text-[#FFE75C]">{user?.lastName}</span>
                          </span>
                          <span className="ms-4 text-[#FFE75C]">{getAge(user?.dob)}</span>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <span className="">UNILAG {user?.level}</span>
                          </div>
                          <div>
                            <span className="">{user?.course}</span>
                          </div>
                        </div>
                        <div>
                          <span>{user?.homeAddress}</span>
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
              <div className="grid sm:grid-cols-5 rounded-xl bg-[#0B7077] gap-2 p-5 mb-0">
                <div className="col-span-4 self-center">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Link href="/student" className="relative group block text-center">
                        <span className="text-xl">Map Search</span>
                        <NavUnderlineLarge />
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/student/applications/pending"
                        className="relative group block text-center"
                      >
                        <span className="text-xl">Applications</span>
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
                    <button className="text-[#0B7077] bg-white rounded px-4 py-2">
                      Report Page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-5 gap-4">
              <div className="col-span-5">
                <div className="bg-white mt-4 text-black flex flex-wrap">
                  <div className={'w-full p-8'}>
                    <div className="text-center mb-5">
                      <div className="text-3xl font-bold text-[#0B7077] mb-4">
                        LAND MORE INTERNSHIPS OFFER
                      </div>
                      <div className="text-lg font-bold text-[#0B7077] mb-4">
                        Power Up With Coin
                      </div>
                      <div className="text-[#8E8E93]">
                        Start with free coins on us! Need more?
                        <br />
                        Purchase additional coins for uninterrupted access.
                      </div>
                    </div>
                    <div className="bg-[#EFEFEF] pb-8">
                      <div className="p-8">
                        <div className="mb-4">1 Coin = ₦100 </div>
                        <div className="flex justify-between">
                          <div>Pricing estimate</div>
                          <div>₦{coinsCount * 100}</div>
                        </div>
                      </div>
                      <div className="bg-[#FAFAFA] p-8">
                        <div className="grid grid-cols-12 gap-2 mb-5">
                          <div>0</div>
                          <div className="col-span-10">
                            <Slider value={coins} onValueChange={setCoins} max={100} step={1} />
                          </div>
                          <div className="text-right">100</div>
                        </div>
                        <div className="mx-4 mb-6">
                          <div className="grid grid-cols-7 gap-2">
                            <div
                              onClick={() => setCoins([10])}
                              className={`${coinsCount === 10 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              10 Coins
                            </div>
                            <div
                              onClick={() => setCoins([20])}
                              className={`${coinsCount === 20 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              20 Coins
                            </div>
                            <div
                              onClick={() => setCoins([30])}
                              className={`${coinsCount === 30 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              30 Coins
                            </div>
                            <div
                              onClick={() => setCoins([50])}
                              className={`${coinsCount === 50 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              50 Coins
                            </div>
                            <div
                              onClick={() => setCoins([70])}
                              className={`${coinsCount === 70 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              70 Coins
                            </div>
                            <div
                              onClick={() => setCoins([80])}
                              className={`${coinsCount === 80 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              80 Coins
                            </div>
                            <div
                              onClick={() => setCoins([100])}
                              className={`${coinsCount === 100 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                            >
                              100 Coins
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button className="bg-primary text-white py-4 px-6 rounded-lg">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Page
