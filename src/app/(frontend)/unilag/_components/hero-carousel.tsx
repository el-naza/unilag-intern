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
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 place-content-center h-[100vh] mb-40 transition-all max-md:mt-20 relative overflow-hidden">
      <div
        className={`grid place-content-center my-auto mx-0 items-center lg:justify-items-start md:justify-items-start sm:justify-items-center xs:justify-items-center content-center h-[85vh] z-10 rounded-tr-[50px] rounded-br-[50px] ${bgColors[currentSlide]}`}
      >
        <p className="text-sm mb-8 bg-white px-3 py-2 rounded-md lg:mx-0 md:mx-0 sm:mx-auto xs:mx-auto">
          Never stop learning
        </p>
        <h1
          className={`scroll-m-20 font-semibold tracking-tight 2xl:text-[4rem] xl:text-[4rem] lg:text-[3rem] md:text-[2rem] sm:text-[2rem] xs:text-[2rem] md:text-left sm:text-center xs:text-center ${currentSlide === 0 ? 'text-black' : 'text-white'}`}
        >
          Industrial Training <br /> Processing Just Got <br /> Easier and Better
        </h1>

        <div className="flex gap-12 lg:mx-0 md:mx-0 sm:mx-auto xs:mx-auto mt-12">
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

      <div className="bg-[#D2E6E4] absolute top-[50%] left-[50%] -translate-x-1/2 translate-y-1/2 z-10 w-36 rounded-full aspect-square place-content-center lg:grid md:hidden sm:hidden xs:hidden">
        <div
          className={`${playBgColors[currentSlide]} rounded-full w-24 h-24 grid place-content-center absolute bottom-[0.6rem] right-[16%]`}
        >
          <Image
            src="/icons/play-icon.svg"
            alt="Play"
            width={50}
            height={50}
            className="w-[3rem] mx-auto ml-2"
          />
        </div>
      </div>

      <div
        className={`lg:grid md:grid sm:hidden xs:hidden place-content-cente my-auto h-[70%] rounded-br-[50px] absolute w-[50%] right-0 ${bg2Colors[currentSlide]}`}
      >
        <Image
          src="/images/wire-lines.svg"
          alt="Wirelines"
          width={3000}
          height={6000}
          className="w-full -left-[15rem] relative"
        />

        <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full -top-28">
          <CarouselContent>
            <CarouselItem className="grid place-content-center relative basis-full h-[100vh]">
              <Image
                src="/images/hero-1.png"
                alt="Hero 1"
                width={500}
                height={200}
                className="mx-auto h-[inherit] w-full"
              />

              <div className="absolute top-[27rem] left-[16rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">99+</p>
                  <p className="text-xs">Companies Listed</p>
                </div>
              </div>

              <div className="absolute top-[39rem] right-[12rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-xs">Interns</p>
                  <p className="font-semibold">999+</p>
                </div>
              </div>

              <div className="absolute top-[20rem] right-[10rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="grid place-content-center relative basis-full h-[100vh]">
              <Image
                src="/images/hero-2.png"
                alt="Hero 2"
                width={500}
                height={200}
                className="mx-auto h-[inherit] w-full"
              />

              <div className="absolute top-[39rem] right-[12rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">99+</p>
                  <p className="text-sm">Companies Listed</p>
                </div>
              </div>

              <div className="absolute top-[20rem] right-[10rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-sm">Interns</p>
                  <p className="font-semibold">999+</p>
                </div>
              </div>

              <div className="absolute top-[27rem] left-[16rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="grid place-content-center relative basis-full h-[100vh]">
              <Image
                src="/images/hero-3.png"
                alt="Hero 3"
                width={500}
                height={200}
                className="scale-x-[2] mx-auto h-[inherit] w-[80%]"
              />

              <div className="absolute top-[27rem] left-[16rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">99+</p>
                  <p className="text-xs">Companies Listed</p>
                </div>
              </div>

              <div className="absolute  top-[20rem] right-[10rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-xs">Interns</p>
                  <p className="font-semibold">999+</p>
                </div>
              </div>

              <div className="absolute top-[39rem] right-[12rem] animate-[bounce_9.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/statistics-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="grid place-content-center relative basis-full h-[100vh]">
              <Image
                src="/images/hero-4.png"
                alt="Hero 4"
                width={1200}
                height={500}
                className="mx-auto h-[inherit] w-full"
              />

              <div className="absolute top-[27rem] left-[16rem] flex gap-2 items-center p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10.5s_ease-in-out_infinite]">
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="font-semibold">99+</p>
                  <p className="text-xs">Companies Listed</p>
                </div>
              </div>

              <div className="absolute top-[39rem] right-[12rem] flex gap-2 items-center  p-[.7rem] bg-[#ffffff73] rounded-[15px] backdrop-blur-[5px] animate-[bounce_10s_ease-in-out_infinite]">
                <Image
                  src="/icons/certified-tutors-icon.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-[2rem]"
                />
                <div>
                  <p className="text-xs">Interns</p>
                  <p className="font-semibold">999+</p>
                </div>
              </div>

              <div className="absolute top-[20rem] right-[10rem] animate-[bounce_9.5s_ease-in-out_infinite]">
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
