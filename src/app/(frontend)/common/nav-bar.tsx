'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import BellIcon from '../assets/icons/bell'
import schoolLogo from '../assets/images/school-logo.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import comapnyDefaultImage from '../assets/images/company-default-image.avif'

interface naveBarProps {
  fill?: string
}
export default function NavBar({ fill }: naveBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const user = useMemo<any>(() => session?.user, [session])

  const navLinks = [
    { label: 'All Interns', paths: ['/company-pages/all-interns'] },
    {
      label: 'Invitations',
      paths: [
        '/company-pages/internship-post',
        '/company-pages/awaiting-interview',
        '/company-pages/internship-request',
        '/company-pages/rejected-requests',
      ],
    },
    { label: 'Reports', paths: ['/company-pages/reports'] },
  ]

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex items-center justify-between lg:px-[100px] px-4 py-[24px] w-full ">
      <div onClick={() => router.push('/company-pages/home')}>
        <Image src={schoolLogo} alt="image" width={44} height={44} objectFit={'contain'} />
      </div>

      <div className="hidden md:block">
        <ul className="flex items-center gap-[44px] font-[400] text-[14px]  absolute left-0 right-0 flex items-center justify-center m-auto w-full ">
          {navLinks.map((link, index) => {
            const isActive = link.paths.includes(pathname)

            return (
              <li key={index}>
                <Link href={link.paths[0]} passHref>
                  <span className={`pb-2 ${isActive ? 'border-b-2 border-white' : ''}`}>
                    {link.label}
                  </span>
                </Link>
              </li>
            )
          })}
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
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.paths[0]} passHref>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-[54px]">
        {/* <BellIcon fill={fill} /> */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/company-pages/company-profile')}
        >
          <Image
            src={user?.image?.url || comapnyDefaultImage}
            alt="image"
            width={44}
            height={44}
            style={{ objectFit: 'cover' }}
            className="rounded-full"
          />
          <div>
            <p className="font-[700] text-[14px] mb-[4px]">{user?.name}</p>
            <p className="font-[400] text-[12px]">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
