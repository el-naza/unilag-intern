'use client'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getPopularCompanies } from '@/services/website/website'
import industries from '@/utilities/industries'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CompanyCard from './_components/company-card'
import CourseCard from './_components/course-card'
import HeroCarousel from './_components/hero-carousel'

export default function HomePage() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  const [isLoadingCompany, setIsLoadingCompany] = useState<boolean>(true)
  const [companies, setCompanies] = useState<any[]>([])

  const fetchPopularCompanies = async (params?: string) => {
    setIsLoadingCompany(true)
    const res: any = await getPopularCompanies('companies', params)
    const { docs } = res.data
    console.log('companies', docs);
    

    setCompanies(docs)
    setIsLoadingCompany(false)
  }

  useEffect(() => {
    fetchPopularCompanies()
  }, [])

  const companyTabChanged = (value: any) => {
    if (value === 'all') fetchPopularCompanies()
    else {
      const query = new URLSearchParams({ 'where[industry][like]': value }).toString()
      fetchPopularCompanies(query)
    }
  }

  return (
    <div>
      <HeroCarousel />

      <div className="container mx-auto mb-32 relative">
        <div id="companies" className="absolute -top-20" />
        <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-[#FD661F] text-center mb-[45px]">
          Popular Companies
          <div className="absolute right-0 left-0 mx-auto w-[200px]">
            <Image
              src="/images/underline2.png"
              alt="Gift Card"
              width={200}
              height={100}
              className="lg:ml-36 xs:ml-0"
            />
          </div>
        </h2>
        <Tabs defaultValue="all" className="" onValueChange={companyTabChanged}>
          <TabsList className="w-full bg-transparent gap-4 overflow-x-auto overflow-y-hidden justify-start py-10">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
            >
              All Industries
            </TabsTrigger>

            {industries?.map((ind: string, index: number) => (
              <TabsTrigger
                key={index}
                value={ind}
                className="data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:border-[1px] data-[state=inactive]:border-secondary rounded-[8px]"
              >
                {ind}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            {isLoadingCompany && <Spinner className="mx-auto border-t-primary border-r-primary" />}

            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <CarouselContent>
                {companies.map((company: any) => (
                  <CarouselItem
                    className="px-4 grid place-content-center lg:basis-96 md:basis-96 xs:basis-72"
                    key={company.id}
                  >
                    <CompanyCard company={company} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>

          {industries?.map((ind: string, index: number) => (
            <TabsContent value={ind} key={index}>
              {isLoadingCompany ? (
                <Spinner className="mx-auto border-t-primary border-r-primary" />
              ) : (
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  plugins={[plugin.current]}
                  className="w-full"
                >
                  <CarouselContent>
                    {companies?.map((company: any) => (
                      <CarouselItem
                        className="px-4 grid place-content-center basis-96"
                        key={company.id}
                      >
                        <CompanyCard company={company} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="container mx-auto mb-32 relative">
        <div id="interns" className="absolute -top-20" />

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
          Intrns is the central online software suite that combines all the tools <br /> needed to
          recruit all kinds of interns.
        </p>

        <div className="mt-8">
          <CourseCard />
        </div>
      </div>

      {/* STUDENT ID CARD */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:gap-8 md:gap-8 sm:gap-16 xs:gap-16 container mx-auto mb-32">
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
            <p>
              An intern ID provides official identification for organizational access and resource
              use.
            </p>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/group.png" alt="Group Icon" width={20} height={5} />
            </span>
            <p>
              Having an ID card offers professional recognition and facilitates workplace
              integration.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/people.png" alt="People Icon" width={20} height={5} />
            </span>
            <p>
              Intern IDs can unlock potential discounts and benefits within the local community.
            </p>
          </div>
        </div>
        <div className="grid place-content-center bg-[#D2E6E4] rounded-[20px] py-10">
          <Image src="/images/student-id.png" alt="Student ID" width={500} height={10} />
        </div>
      </div>

      {/* STAFF TRAINING */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:gap-8 sm:gap-16 container mx-auto mb-48">
        <div className="grid place-content-center py-10">
          <Image src="/images/staff.png" alt="Staff" width={500} height={10} />
        </div>
        <div>
          <span className="rounded-[10px] bg-[#f5f5f5] text-primary px-4 py-2 font-medium">
            Reports
          </span>
          <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 text-secondary mb-[45px]">
            Evidence of Completion
          </h2>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/grid.png" alt="Grid Icon" width={20} height={5} />
            </span>
            <p>
              Weekly reports consistently prove your active involvement and learning throughout the
              internship.
            </p>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/group.png" alt="Group Icon" width={20} height={5} />
            </span>
            <p>
              These reports showcase tangible skills and accomplishments gained during your
              internship.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="w-[40px] h-[40px] shadow-xl rounded-full grid place-content-center">
              <Image src="/icons/people.png" alt="People Icon" width={20} height={5} />
            </span>
            <p>
              Weekly reports provide documented verification and feedback for formal completion
              assessment.
            </p>
          </div>
        </div>
      </div>

      {/* GIFT CARDS */}
      <div className="container mx-auto  bg-[#DF1C25] text-white rounded-[16px] flex relative mb-32">
        <div className="lg:p-8 md:p-8 sm:p-4 xs:p-4 z-10">
          <h2 className="scroll-m-20 pb-2 text-[48px] font-bold tracking-tight first:mt-0 mb-[20px]">
            Why you should buy <br /> gift cards?
          </h2>
          <ul className="leading-[2.3rem] mb-8">
            <li className="flex gap-3 items-start mb-4">
              <Image src="/icons/gift-card-list-icon.png" alt="Star Icon" width={20} height={20} />{' '}
              You can give the perfect present easily with our flexible gift cards.
            </li>
            <li className="flex gap-3 items-start  mb-4">
              <Image src="/icons/gift-card-list-icon.png" alt="Star Icon" width={20} height={20} />{' '}
              Our gift cards unlock access to many desired products and services across the web.
            </li>
            <li className="flex gap-3 items-start">
              <Image src="/icons/gift-card-list-icon.png" alt="Star Icon" width={20} height={20} />{' '}
              Trust us for a safe and reliable way to purchase your gift cards.
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
      {/* <div className="lg:px-24 lg:pb-24 container mx-auto">
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
      </div> */}
    </div>
  )
}
