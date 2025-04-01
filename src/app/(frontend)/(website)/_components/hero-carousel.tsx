'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import Autoplay from 'embla-carousel-autoplay'

const HeroCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
  const [currentSlide, setCurrentSlide] = useState(0)
  const [api, setApi] = React.useState<CarouselApi>()
  const bgColors = ['bg-white', 'bg-secondary', 'bg-[#6B1868]', 'bg-[#523842]']
  const playBgColors = ['bg-[#A71C51]', 'bg-[#AE7461]', 'bg-secondary', 'bg-[#A71C51]']
  const bg2Colors = ['bg-primary', 'bg-[#AE7461]', 'bg-secondary', 'bg-primary']

  useEffect(() => {
    if (!api) return

    api.on('select', (ev) => {
      setCurrentSlide(ev.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-content-center h-[90vh] mb-28 transition-all relative">
      <div
        className={`grid place-content-center my-auto mx-0 items-center justify-items-start content-center z-10 pl-12 pr-4 py-4 rounded-tr-[50px] rounded-br-[50px] h-[80%] ${bgColors[currentSlide]}`}
      >
        <p className="text-sm  mb-8 bg-white px-3 py-2 rounded-md">Never stop learning</p>
        <h1
          className={`scroll-m-20 font-semibold tracking-tight lg:text-[3rem] md:text-[2rem] sm:text-[3rem] md:text-left sm:text-center ${currentSlide === 0 ? 'text-black' : 'text-white'}`}
        >
          Industrial Training <br /> Processing Just Got <br /> Easier and Better
        </h1>

        <div className="flex gap-12 mt-12">
          <Link href="/auth/login">
            {' '}
            <Button className="bg-primary text-white uppercase border-[1px]">
              I&apos;m a student
            </Button>
          </Link>
          <Link href="/company-auth/login">
            {' '}
            <Button className="bg-secondary text-white uppercase border-[1px]">
              I&apos;m a company
            </Button>
          </Link>
        </div>
      </div>

      <div
        className={`absolute z-10 bottom-[16rem] w-[8rem] right-[45%] rounded-full aspect-square grid place-content-center border-[15px] border-[ #D2E6E4] ${playBgColors[currentSlide]} `}
      >
        {/* <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                fill="blue"
                id="circlePath"
                d="
                M 10, 50
                a 40,40 0 1,1 80,0
                40,40 0 1,1 -80,0
                "
            />
            <text>
                <textPath href="#circlePath">
                    Explore More - Explore More
                </textPath>
            </text>
        </svg> */}
        <Image
          src="/icons/play-icon.svg"
          alt="Play"
          width={50}
          height={50}
          className="w-[3rem] mx-auto ml-2"
        />
      </div>

      <div
        className={`lg:grid md:grid sm:hidden place-content-cente my-auto h-[80%] rounded-br-[50px] rounded-bl-[50px] relative -top-[10rem] ${bg2Colors[currentSlide]}`}
      >
        <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            <CarouselItem className="p-8 mx-auto grid place-content-center relative top-[6rem] basis-full">
              <Image
                src="/images/hero-1.png"
                alt="Hero 1"
                width={1200}
                height={500}
                className="w-[40rem]"
              />

              <div className="absolute top-[27rem] left-[10rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">250k</p>
                  <p className="text-xs">Company Listed</p>
                </div>
              </div>

              <div className="absolute top-[33rem] right-[5rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-xs">Interns</p>
                  <p className="font-semibold">250+</p>
                </div>
              </div>

              <div className="absolute top-[22rem] right-[10rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="p-8 mx-auto grid place-content-center relative top-[6rem] basis-full">
              <Image
                src="/images/hero-2.png"
                alt="Hero 2"
                width={1200}
                height={500}
                className="w-[30rem]"
              />

              <div className="absolute top-[33rem] right-[12rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">250k</p>
                  <p className="text-sm">Company Listed</p>
                </div>
              </div>

              <div className="absolute top-[22rem] right-[10rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-sm">Interns</p>
                  <p className="font-semibold">250+</p>
                </div>
              </div>

              <div className="absolute top-[27rem] left-[10rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="p-8 mx-auto grid place-content-center relative top-[6rem] basis-full">
              <Image
                src="/images/hero-3.png"
                alt="Hero 3"
                width={1200}
                height={500}
                className="w-[40rem] scale-[2]"
              />

              <div className="absolute top-[22rem] right-[10rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">250k</p>
                  <p className="text-sm">Company Listed</p>
                </div>
              </div>

              <div className="absolute top-[27rem] left-[10rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-sm">Interns</p>
                  <p className="font-semibold">250+</p>
                </div>
              </div>

              <div className="absolute top-[33rem] right-[15rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="p-8 mx-auto grid place-content-center relative top-[6rem] basis-full">
              <Image
                src="/images/hero-4.png"
                alt="Hero 4"
                width={1200}
                height={500}
                className="w-[40rem] scale-110"
              />

              <div className="absolute top-[27rem] left-[10rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">250k</p>
                  <p className="text-sm">Company Listed</p>
                </div>
              </div>

              <div className="absolute top-[33rem] right-[5rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-sm">Interns</p>
                  <p className="font-semibold">250+</p>
                </div>
              </div>

              <div className="absolute top-[22rem] right-[10rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export default HeroCarousel
