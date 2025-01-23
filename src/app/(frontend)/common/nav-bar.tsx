'use client'
import { useState } from 'react'
import Image from 'next/image'
import BellIcon from '../assets/icons/bell'
import schoolLogo from '../assets/images/school-logo.png'
import companyLogo from '../assets/images/company-logo.png'
import { useRouter } from 'next/navigation'

interface naveBarProps {
  fill?: string
}
export default function NavBar({ fill }: naveBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navLinks = [
    { id: '1', title: 'All Interns' },
    { id: '2', title: 'Invitations' },
    { id: '3', title: 'All Reports' },
  ]

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const router = useRouter()

  return (
    <div className="flex items-center justify-between px-[20px] py-[24px] w-full">
      <div onClick={() => router.push('/company-pages/home')}>
        <Image src={schoolLogo} alt="image" width={44} height={44} objectFit={'contain'} />
      </div>

      <div className="hidden md:block">
        <ul className="flex items-center gap-[44px] font-[400] text-[14px]">
          {navLinks.map((n) => (
            <li key={n.id}>{n.title}</li>
          ))}
        </ul>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          ☰
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-[#0B7077] py-4 px-6 z-10 w-[max-fontent]">
          <div className="md:hidden flex items-center mb-3">
            <button onClick={toggleMenu} className="text-2xl">
              ☰
            </button>
          </div>
          <ul className="flex flex-col lg:items-center gap-4 font-[400] text-[14px]">
            {navLinks.map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-[54px]">
        <BellIcon fill={fill} />
        <div className="flex items-center gap-3">
          <Image
            src={companyLogo}
            alt="image"
            width={44}
            height={44}
            objectFit={'contain'}
            className="rounded-full"
          />
          <div>
            <p className="font-[700] text-[14px] mb-[4px]">CRM SHOPPING MALL</p>
            <p className="font-[400] text-[12px]">CRMSHOPPING@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
