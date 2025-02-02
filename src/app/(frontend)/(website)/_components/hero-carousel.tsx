"use client"
import React, { useRef } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem
  } from "@/components/ui/carousel"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Autoplay from "embla-carousel-autoplay"
 
  

const HeroCarousel = () => {

    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
      )


  return (
   <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 h-[60vh] place-content-center lg:mt-36 lg:max-w-[75vw] sm:max-w-[90vw] mx-auto lg:mb-48 sm:mb-10'>

        <div className='grid lg:justify-start md:justify-start sm:justify-center items-center lg:justify-items-start md:justify-items-start sm:justify-items-center content-center'>
            <p className='text-sm text-muted-foreground mb-8'>Never stop learning</p>
            <h1 className="scroll-m-20 font-semibold tracking-tight lg:text-[4rem] md:text-[2rem] sm:text-[3rem] lg:leading-[5rem] md:text-left sm:text-center">Industrial Training <br /> Processing Just Got <br /> Easier and Better</h1>

            <div className='flex gap-12 mt-12'>
                <Button className='bg-primary text-white'>I'm a student</Button>
                <Button className='bg-secondary text-white'>I'm a company</Button>
            </div>
        </div>

        <div className='lg:grid md:grid sm:hidden place-content-center'>
            <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                }}
                // plugins={[plugin.current]}
                className="w-full">
                <CarouselContent>
                    <CarouselItem className="p-8 mx-auto grid place-content-center">
                        <Image src='/images/hero-1.png' alt='Hero 1' width={1200} height={500} className='w-[30rem]' />
                    </CarouselItem>
                    <CarouselItem className="p-8 mx-auto grid place-content-center">
                        <Image src='/images/hero-2.png' alt='Hero 2' width={1200} height={500} className='w-[30rem]' />
                    </CarouselItem>
                    <CarouselItem className="p-8 mx-auto grid place-content-center">
                        <Image src='/images/hero-3.png' alt='Hero 3' width={1200} height={500} className='w-[40rem]' />
                    </CarouselItem>
                    <CarouselItem className="p-8 mx-auto grid place-content-center">
                        <Image src='/images/hero-4.png' alt='Hero 4' width={1200} height={500} className='w-[30rem]'/>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>        
    </div>
  )
}

export default HeroCarousel

