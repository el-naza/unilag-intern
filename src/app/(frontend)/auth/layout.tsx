import React from 'react'
import Image from 'next/image'
import authLine from '@/app/(frontend)/assets/images/auth-line.svg'
import StarCircle from '../assets/icons/starCircle'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="lg:hidden">
        <Image
          src={'/images/student-image.jpeg'}
          alt="image"
          width={565}
          height={954}
          // objectFit={'contain'}
          className="fixed h-[calc(100vh_+_76px)] w-[calc(100vw_+_163px)] -z-10 object-cover"
        />
        <div className="fixed h-screen w-screen -z-10 bg-[#14141499]" />
        {children}
      </div>
      <div className="hidden lg:block h-screen">
        <div className="grid grid-cols-2">
          <div className="h-screen bg-[#0B7077]">
            <div className="bg-[#195F7E] flex grid grid-rows-4 gap-3">
              <div className="m-auto row-span-3 grid gap-14 min-w-[300px]">
                <div className="m-auto">
                  <Image
                    src={'/images/unilag-logo.png'}
                    alt="unilag-logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="grid grid-cols-5 gap-4 cursor-pointer relative">
                  <Image
                    className="top-[62px] left-[22px] absolute"
                    src={authLine}
                    alt="auth-line"
                  />
                  <div className="m-auto">
                    <div className="relative h-[50px] w-[50px] rounded-full border-4 border-white bg-transparent">
                      <div className="absolute top-[15%] left-[15%] h-[30px] w-[30px] rounded-full border-4 border-white bg-white bg-transparent"></div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="rounded-lg p-5 text-black bg-white">
                      <span className="text-xl">Siwes</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 group cursor-pointer relative">
                  <Image
                    className="top-[62px] left-[22px] absolute"
                    src={authLine}
                    alt="auth-line"
                  />
                  <div className="m-auto">
                    <div className="relative h-[50px] w-[50px] rounded-full border-4 border-white bg-transparent">
                      <div className="hidden group-hover:block absolute top-[15%] left-[15%] h-[30px] w-[30px] rounded-full border-4 border-white bg-white bg-transparent"></div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="rounded-lg p-5 text-white hover:text-black bg-[#0B7077] hover:bg-white">
                      <span className="text-xl">Non Siwes</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 group cursor-pointer">
                  <div className="m-auto">
                    <div className="relative h-[50px] w-[50px] rounded-full border-4 border-white bg-transparent">
                      <div className="hidden group-hover:block absolute top-[15%] left-[15%] h-[30px] w-[30px] rounded-full border-4 border-white bg-white bg-transparent"></div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="rounded-lg p-5 text-white hover:text-black bg-[#0B7077] hover:bg-white">
                      <span className="text-xl">Lecturer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0B7077] py-8 px-5">
                <div className="grid grid-cols-4 gap-5">
                  <div className="col-span-3">
                    <div className="grid gap-5">
                      <div className="text-white font-bold text-3xl ls-normal">
                        Why You should buy <br />
                        gift cards?
                      </div>
                      <div className="text-white text-sm flex items-center">
                        <StarCircle />
                        <span className="ms-1">
                          Teachers don’t get lost in the grid view and have a dedicated Podium
                          space.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="m-auto">
                    <Image
                      width={140}
                      height={140}
                      src="/images/smiling-american-woman.png"
                      alt="smiling-american-woman"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
