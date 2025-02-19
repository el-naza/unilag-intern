import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import AvatarGroup from './avatar-group'


const programs = [ 
    {
        title: 'Product Management Basic - Course',
        description: 'Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.',
        imageSrc: '/images/company-1.png'
    },
    {
        title: 'Product Management Basic - Course',
        description: 'Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.',
         imageSrc: '/images/company-2.png'
    },
    {
        title: 'Product Management Basic - Course',
        description: 'Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.',
         imageSrc: '/images/company-3.png'
    },
    {
        title: 'Product Management Basic - Course',
        description: 'Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.',
         imageSrc: '/images/company-4.png'
    },
]

const CompanyCard = () => {
    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 rounded-md'>
            {
                programs.map((program, index) => (
                    <div className='shadow-lg rounded-[14px] bg-white' key={index}>
                        <div className='w-full relative'>
                            <Image src={program.imageSrc} alt='Company' width={1200} height={200} className='rounded-tl-[14px] rounded-tr-[14px]' />
                            <div className='w-full grid place-content-center absolute -bottom-[20px]'>
                               <AvatarGroup />
                            </div>
                        </div>
                        <div className='pt-12 px-4 pb-16'>
                            <p className='mb-3'>1-28 July 2022</p>
                            <h3 className="scroll-m-20 text-[1rem] font-bold tracking-tight text-secondary mb-3">{ program.title }</h3>
                            <p className='line-clamp-3'>{program.description}</p>
                        </div>

                        <div className='flex justify-between px-4 mb-8'>
                           <div  className='flex gap-3 items-center'>
                                <h3 className='scroll-m-20 text-xl font-bold tracking-tight text-[#FD661F]'>$123</h3>
                                <p className='line-through'>$500</p>
                           </div>
                           <Button className='bg-primary text-white'>Enroll Now</Button>
                        </div>
        
                    </div>
                ))
            }
        </div>
    )
}

export default CompanyCard