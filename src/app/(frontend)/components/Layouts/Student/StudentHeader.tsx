import React, { useMemo } from 'react'
import ProfilePicture from '../../../assets/icons/profilepicture'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function StudentHeader() {
  const { data: session } = useSession()

  const user = useMemo<any>(() => session?.user, [session])

  return (
    <div className="grid grid-cols-5 mb-4">
      <div className="col-span-4">
        <div className="grid grid-cols-5 gap-2">
          <div>
            <Link href="/student/profile">
              <ProfilePicture />
            </Link>
          </div>
          {user && (
            <div className="col-span-4">
              <div className="text-[#FFCC00] font-bold">{`${user.firstName} ${user.lastName}`}</div>
              <div className="text-xs">{`UNILAG ${user.level} ${user.course}`}</div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex ms-auto my-auto">
          <Link href="/student/reports/create">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4.146H20V16.146H5.17L4 17.316V4.146ZM4 2.146C2.9 2.146 2.01 3.046 2.01 4.146L2 22.146L6 18.146H20C21.1 18.146 22 17.246 22 16.146V4.146C22 3.046 21.1 2.146 20 2.146H4ZM6 12.146H18V14.146H6V12.146ZM6 9.146H18V11.146H6V9.146ZM6 6.146H18V8.146H6V6.146Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
        <div className="flex ms-auto my-auto">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9.036L12.94 12.146H15.76L13.49 13.766L14.42 16.776L12 14.936L9.58 16.776L10.51 13.766L8.24 12.146H11.06L12 9.036ZM12 2.146L9.58 10.146H2L8.17 14.556L5.83 22.146L12 17.456L18.18 22.146L15.83 14.556L22 10.146H14.42L12 2.146Z"
              fill="#FF9500"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
