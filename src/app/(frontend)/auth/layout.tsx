import React from 'react'
import Image from 'next/image'
import authLine from '@/app/(frontend)/assets/images/auth-line.svg'
import StarCircle from '../assets/icons/starCircle'
import ToggleButtons from "./toggle"

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
                
                <ToggleButtons/>
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
