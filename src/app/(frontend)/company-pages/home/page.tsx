'use client'

import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import { useState } from 'react'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/student-profile-card'
export default function CompanyHomePage() {
  const [active, setActive] = useState<string>('  All Career Area')
  const careers = [
    { title: '  All Career Area' },
    { title: 'Science' },
    { title: 'Engineering' },
    { title: 'Business' },
    { title: 'Arts' },
    { title: 'Medicine' },
  ]

  const students = [
    {
      name: 'Kotu Faruq',
      course: 'Mathematics',
      cgpa: '3.5',
      image: studentImage.src,
    },
    {
      name: 'Jane Doe',
      course: 'Physics',
      cgpa: '3.8',
      image: studentImage.src,
    },
    {
      name: 'John Smith',
      course: 'Engineering',
      cgpa: '3.6',
      image: studentImage.src,
    },
    {
      name: 'Kotu Faruq',
      course: 'Mathematics',
      cgpa: '3.5',
      image: studentImage.src,
    },
    {
      name: 'Jane Doe',
      course: 'Physics',
      cgpa: '3.8',
      image: studentImage.src,
    },
    {
      name: 'John Smith',
      course: 'Engineering',
      cgpa: '3.6',
      image: studentImage.src,
    },
    {
      name: 'Kotu Faruq',
      course: 'Mathematics',
      cgpa: '3.5',
      image: studentImage.src,
    },
    {
      name: 'Jane Doe',
      course: 'Physics',
      cgpa: '3.8',
      image: studentImage.src,
    },
    {
      name: 'John Smith',
      course: 'Engineering',
      cgpa: '3.6',
      image: studentImage.src,
    },
  ]
  return (
    <div>
      <div
        className=""
        style={{
          backgroundImage: `url(${hero.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '318px',
        }}
      >
        <nav className="text-[#FFFFFF]">
          <NavBar />
        </nav>

        <div className=" mt-[67px]">
          <div className="max-w-[650px] m-auto flex items-center justify-center flex-col">
            <p className="font-[500] text-[24px] leading-[29px] text-[#FFFFFF] max-w-[535px] text-center">
              Quickly Find the Right Students for Your Company!
            </p>
            <div className="mt-[32px] flex items-center justify-center">
              {careers &&
                careers.map((c) => (
                  <button
                    className={`p-[8px] rounded-[4px] font-[400] text-[14px] text-[#FFFFFF] ${
                      active === c.title ? 'bg-[#0B7077] ' : ''
                    }`}
                    key={c.title}
                    onClick={() => setActive(c.title)}
                  >
                    {c.title}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[866px] m-auto ">
        <p className="py-[7px] font-[500] text[20px] ">Student List</p>
        <div className="grid grid-cols-4 gap-[14px] p-[12px]">
          {students.map((student, index) => (
            <StudentProfileCard key={index} student={student} />
          ))}
        </div>
      </div>
    </div>
  )
}
