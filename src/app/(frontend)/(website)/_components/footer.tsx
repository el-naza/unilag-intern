import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import './footer.scss'


const Footer = () => {
  return (
    <footer className='grid grid-cols-12 justify-evenly gap-8 bg-[#D2E6E4] text-primary pb-16 pt-24 px-24 text-[14px] w-full curved-top'>

        <div className='lg:col-span-1 sm:col-span-3'>
            <Image src={'/images/unilag-logo.png'} alt="Logo" width={60} height={100} />
        </div>

        <div className='lg:col-span-3 sm:col-span-5'>
            <ul className='space-y-2'>
                <li><strong>Address:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora necessitatibus praesentium</li>
                <li>Tel: <a href="tel:+23498720938">+23498720938</a></li>
                <li>Tesponse Hours: 8am to 5pm</li>
                <li>Email: info@unilaglearn.com</li>
            </ul>
        </div>

        <div className='lg:col-span-2 sm:col-span-4'>
            <p className='text-black font-semibold'>Categories</p>
            <ul className='space-y-2'>
                <li>Councelling</li>
                <li>Health & Fitness</li>
                <li>Individual Development</li>
                <li>more</li>
            </ul>
        </div>

        <div className='lg:col-span-2 sm:col-span-3'>
            <p className='text-black font-semibold'>Links</p>
            <ul className='space-y-2'>
                <li><Link href="/">About US</Link></li>
                <li><Link href="/blog">Blog</Link></li>
            </ul>
        </div>

        <div className='lg:col-span-3 sm:col-span-6'>
            <label htmlFor="email">Stay up to date with the latest course</label>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2 bg-white p-2 rounded-[14px]">
                <Input type="email" placeholder="Email" className='border-0 outline-none'/>
                <Button type="submit" className='bg-primary text-white rounded-[12px]'>Send</Button>
            </div>
        </div>
    </footer>
  )
}

export default Footer