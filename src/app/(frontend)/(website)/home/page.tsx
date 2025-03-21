'use client'
import CompanyCard from '../_components/company-card'
import CourseCard from '../_components/course-card'
import HeroCarousel from '../_components/hero-carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import NewsLetterCard from '../_components/news-letter-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export default function HomePage() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  return (
    <div>
      <HeroCarousel />

      <div className="lg:max-w-[75vw] sm:max-w-[90vw] mx-auto mb-32">
        <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-[#FD661F] text-center mb-[45px]">
          Popular Companies
        </h2>

        <Tabs defaultValue="all" className="">
          <TabsList className="mx-auto w-full bg-transparent gap-8 flex-wrap sm:mb-20">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              All Programme
            </TabsTrigger>
            <TabsTrigger
              value="science"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              Science
            </TabsTrigger>
            <TabsTrigger
              value="engineering"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              Engineering
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              Business
            </TabsTrigger>
            <TabsTrigger
              value="art"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              Art
            </TabsTrigger>
            <TabsTrigger
              value="medicine"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              Medicine
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <CompanyCard />
          </TabsContent>

          <TabsContent value="science">
            <CompanyCard />
          </TabsContent>

          <TabsContent value="engineering">
            <CompanyCard />
          </TabsContent>

          <TabsContent value="business">
            <CompanyCard />
          </TabsContent>

          <TabsContent value="art">
            <CompanyCard />
          </TabsContent>

          <TabsContent value="medicine">
            <CompanyCard />
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:max-w-[75vw] sm:max-w-[90vw] mx-auto mb-32">
        <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-secondary text-center mb-[45px] relative">
          Intern Categories
          <Image
            src="/images/underline.png"
            alt="Gift Card"
            width={200}
            height={100}
            className="absolute right-[35%]"
          />
        </h2>
        <p className="text-center text-[#696984] text-[22px]">
          Onlearing is one powerful online software suite that combines all the tools <br /> needed
          to run a successful school or office.
        </p>

        <div className="mt-8">
          <CourseCard />
        </div>
      </div>

      {/* STUDENT ID CARD */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:gap-8 sm:gap-16 lg:max-w-[75vw] sm:max-w-[90vw] mx-auto mb-32">
        <div>
          <span className="rounded-[10px] bg-[#f5f5f5] text-primary px-4 py-2 font-medium">
            Benefit
          </span>
          <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-primary mb-[45px]">
            Get Intern ID Card
          </h2>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/grid.png" alt="Grid Icon" width={20} height={5} />
            </span>
            <p>Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/group.png" alt="Group Icon" width={20} height={5} />
            </span>
            <p>TA’s and presenters can be moved to the front of the class.</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/people.png" alt="People Icon" width={20} height={5} />
            </span>
            <p>Teachers can easily see all students and class data at one time.</p>
          </div>
        </div>
        <div className="grid place-content-center bg-[#D2E6E4] rounded-[20px] py-10">
          <Image src="/images/student-id.png" alt="Student ID" width={500} height={10} />
        </div>
      </div>

      {/* STAFF TRAINING */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:gap-8 sm:gap-16 lg:max-w-[75vw] sm:max-w-[90vw] mx-auto mb-48">
        <div className="grid place-content-center py-10">
          <Image src="/images/staff.png" alt="Staff" width={500} height={10} />
        </div>
        <div>
          <span className="rounded-[10px] bg-[#f5f5f5] text-primary px-4 py-2 font-medium">
            Certificate
          </span>
          <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-secondary mb-[45px]">
            Certificate of Completion
          </h2>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/grid.png" alt="Grid Icon" width={20} height={5} />
            </span>
            <p>Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/group.png" alt="Group Icon" width={20} height={5} />
            </span>
            <p>TA’s and presenters can be moved to the front of the class.</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/people.png" alt="People Icon" width={20} height={5} />
            </span>
            <p>Teachers can easily see all students and class data at one time.</p>
          </div>
        </div>
      </div>

      {/* GIFT CARDS */}
      <div className="lg:max-w-[75vw] sm:max-w-[90vw] mx-auto  bg-[#DF1C25] text-white rounded-[16px] flex relative">
        <div className="p-12 z-10">
          <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 mb-[20px]">
            Why you should buy <br /> gift cards?
          </h2>
          <ul className="leading-[2.3rem] mb-8">
            <li className="flex gap-3 items-center">
              <Image src="/icons/gift-card-list-icon.png" alt="Star Icon" width={20} height={20} />{' '}
              Teachers don’t get lost in the grid view and have a dedicated Podium space.
            </li>
            <li className="flex gap-3 items-center">
              <Image src="/icons/gift-card-list-icon.png" alt="Star Icon" width={20} height={20} />{' '}
              Teachers don’t get lost in the grid view and have a dedicated Podium space.
            </li>
            <li className="flex gap-3 items-center">
              <Image src="/icons/gift-card-list-icon.png" alt="Star Icon" width={20} height={20} />{' '}
              Teachers don’t get lost in the grid view and have a dedicated Podium space.
            </li>
          </ul>
          <Button className="bg-white text-primary" variant="ghost">
            Buy Now
          </Button>
        </div>
        <div className="absolute bottom-0 -right-[10px]">
          <Image src="/images/gift-card.png" alt="Gift Card" width={780} height={20} />
        </div>
      </div>

      {/* NEWS LETTER */}
      <div className="lg:p-24 lg:max-w-[75vw] sm:max-w-[90vw] mx-auto">
        <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-secondary text-center mb-[45px] relative">
          News Letter
          <Image
            src="/images/underline.png"
            alt="Gift Card"
            width={200}
            height={100}
            className="absolute right-[35%]"
          />
        </h2>
        <p className="text-center text-[#696984] text-[22px]">
          Your Inside Scoop on Intern Insights & Opportunities.
          <br />
          Unlock Your Potential: News & Resources for Interns.
        </p>
      </div>

      <div className="grid place-content-center px-16 mb-32">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="p-8 mx-auto grid place-content-center sm:basis-full md:basis-11/12 lg:basis-2/5">
              <NewsLetterCard />
            </CarouselItem>
            <CarouselItem className="p-8 mx-auto grid place-content-center sm:basis-full md:basis-11/12 lg:basis-2/5">
              <NewsLetterCard />
            </CarouselItem>
            <CarouselItem className="p-8 mx-auto grid place-content-center sm:basis-full md:basis-11/12 lg:basis-2/5">
              <NewsLetterCard />
            </CarouselItem>
            <CarouselItem className="p-8 mx-auto grid place-content-center sm:basis-full md:basis-11/12 lg:basis-2/5">
              <NewsLetterCard />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
