import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const courses = [
  {
    title: 'SIWES',
    description: 'One powerful online software suite that combines',
    imgSrc: '/icons/beauty.png',
  },
  {
    title: 'Teaching Practice',
    description: 'One powerful online software suite that combines',
    imgSrc: '/icons/medical.png',
  },
  {
    title: 'Housemanship',
    description: 'One powerful online software suite that combines',
    imgSrc: '/icons/sport.png',
  },
  {
    title: 'Others',
    description: 'One powerful online software suite that combines',
    imgSrc: '/icons/nutrition.png',
  },
]

const CourseCard = () => {
  return (
    <>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 rounded-md transition-all">
          {courses.map((program, index) => (
              <div className="hover:shadow-md text-center rounded-[14px] px-4 py-8 hover:bg-white group" key={index}>
                
                <Image src={program.imgSrc} alt={'Course ' + index} width={200} height={100} className='w-[60px] h-[60px] rounded-full mx-auto relative mb-8' />
                
                <div className=''>
                    <h3 className="scroll-m-20 text-[1rem] font-bold tracking-tight text-secondary mt-3">{program.title}</h3>
                    <p className='pb-8 mt-3 line-clamp-2'>{program.description}</p>

                    <Button className='bg-white shadow-2xl rounded-[10px] group-hover:bg-primary group-hover:text-white' variant='ghost'>Explore Courses</Button>
                </div>
              </div>
          ))}
        </div>
        <Button className='grid mx-auto lg:w-[15%] sm:w-[50%] mt-10' variant="outline">View all</Button>
    </>
  )
}

export default CourseCard
