import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function StudentNavbar() {
  const pathname = usePathname()

  return (
    <nav className="relative grid grid-cols-4 gap-1 text-sm">
      <div className="flex items-center mb-2">
        <Link href="/student" className="relative group block text-center w-full text-[#B3FAFF]">
          <span className="">Home</span>
          <svg
            className={`absolute w-full left-0 top-full ${pathname === '/student' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            width="47"
            height="8"
            viewBox="0 0 47 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.14624C26.1333 10.2017 41.4478 4.91936 46 1.14624"
              stroke="#FFD836"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
      <div className="flex items-center mb-2">
        <Link
          href="/student/applications/pending"
          className="relative group block text-center w-full text-[#B3FAFF]"
        >
          <span className="">Pending</span>
          <svg
            className={`absolute w-full left-0 top-full ${pathname === '/student/applications/pending' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            width="47"
            height="8"
            viewBox="0 0 47 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.14624C26.1333 10.2017 41.4478 4.91936 46 1.14624"
              stroke="#FFD836"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
      <div className="flex items-center mb-2">
        <Link
          href="/student/applications/approved"
          className="relative group block text-center w-full text-[#B3FAFF]"
        >
          <span className="">Approved</span>
          <span className="absolute h-[5px] w-[5px] bg-[#FF3B30] rounded-full top-0 right-0"></span>
          <svg
            className={`absolute w-full left-0 top-full ${pathname === '/student/applications/approved' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            width="47"
            height="8"
            viewBox="0 0 47 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.14624C26.1333 10.2017 41.4478 4.91936 46 1.14624"
              stroke="#FFD836"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
      <div className="flex items-center mb-2">
        <Link
          href="/student/applications/declined"
          className="relative group block text-center w-full text-[#B3FAFF]"
        >
          <span className="">Declined</span>
          <span className="absolute h-[5px] w-[5px] bg-[#FF3B30] rounded-full top-0 right-0"></span>
          <svg
            className={`absolute w-full left-0 top-full ${pathname === '/student/applications/declined' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            width="47"
            height="8"
            viewBox="0 0 47 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.14624C26.1333 10.2017 41.4478 4.91936 46 1.14624"
              stroke="#FFD836"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
