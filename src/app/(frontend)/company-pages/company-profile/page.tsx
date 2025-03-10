'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import profileLogo from '../../assets/images/compay-profile-logo.png'
import { useMemo, useState } from 'react'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import Image from 'next/image'
import InputField from '../../components/Form/inputField'
import PhoneIcon from '../../assets/icons/phone'
import MailIcon from '../../assets/icons/mail'
import LocationIcon from '../../assets/icons/location'
import LinkIcon from '../../assets/icons/link'
import { useSession } from 'next-auth/react'

export default function CompanyProfile() {
  const { data: session } = useSession()

  const user = useMemo<any>(() => session?.user, [session])
  console.log('user', user)

  const fields = [
    { label: 'Company Name', placeholder: user?.name || 'Company Name', type: 'text' },
    { label: 'CAC Number', placeholder: user?.cacNumber || 'CAC Number', type: 'text' },
    {
      label: 'Location',
      placeholder: user?.address || 'Location',
      type: 'text',
      Icon: LocationIcon,
      fill: '#0B7077',
    },
    { label: 'Email', placeholder: user?.email || 'Email', Icon: MailIcon, type: 'email' },
    { label: 'Phone', placeholder: user?.phone || 'Phone', Icon: PhoneIcon, type: 'text' },
    { label: 'Website', placeholder: user?.website || 'Website', Icon: LinkIcon, type: 'text' },
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
        className="relative"
        style={{
          backgroundImage: `url(${hero.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
          paddingBottom: '',
        }}
      >
        <nav className="text-[#FFFFFF]">
          <NavBar />
        </nav>

        <div className="mt-[75px] pb-[34px] lg:pb-[0]">
          <div className="max-w-full md:max-w-[866px] m-auto flex lg:flex-row flex-col items-center gap-[12px] px-4">
            <Image
              alt="image"
              src={user?.logo || profileLogo.src}
              height="150"
              width="150"
              objectFit="cover"
              className="rounded-full border-2 border-[#418A7E]"
            />
            <h2 className="text-white font-[700] text-[30px]">{user?.name}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-full md:max-w-[866px] m-auto px-4 pb-[100px]">
        {/* <p className="pt-[18px] font-[400] text-[16 px]">Student List</p>
        <p className="mt-[2px] text-[#8E8E93] font-[400] text-[12px]">
          Students Basic Informations
        </p> */}
        <div className="mt-[22px] grid md:grid-cols-3 gap-[14px] md:grid-cols-2">
          {fields.map((field, index) => (
            <InputField
              key={index}
              label={field.label}
              placeholder={field.placeholder}
              Icon={field.Icon}
              type={field.type}
              disabled={true}
            />
          ))}
        </div>

        <div>
          <p className="font-[400] text-[#48484A] text-[14px] my-[8px]">Description</p>
          <div className="p-[12px] w-full bg-white">
            <p className="text-[#48484A] font-[400] text-[14px]">
              CMR Shopping Mall is a premier retail and lifestyle destination that redefines the
              shopping and entertainment experience. Located at the heart of [Insert Location], CMR
              is designed to cater to diverse needs, offering a vibrant mix of retail, dining,
              entertainment, and leisure all under one roof.
            </p>
          </div>
        </div>
        <div className="mt-[38px] mb-[18px]">
          <h3 className="font-[400] text-[16px]">All Interns </h3>
          <p className="text-[#8E8E93] font-[400] text-[12px]">List of all active interns</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] py-[12px]">
          {students.map((student, index) => (
            <StudentProfileCard key={index} student={student} />
          ))}
        </div>
      </div>
    </div>
  )
}
