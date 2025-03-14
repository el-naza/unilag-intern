'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, Settings, icons } from 'lucide-react'

export interface INavMenu {
  label: string
  route: string
  iconName: string
}

const SideBar = ({ menuLinks }: { menuLinks: INavMenu[] }) => {
  const pathname = usePathname()
  const router = useRouter()

  const signAdminOut = async () => {
    router.push('/admin/auth')
  }

  return (
    <div className="w-[270px] h-[100vh] bg-secondary fixed flex justify-between flex-col">
      <div>
        <div className="h-[10rem] grid place-content-center">
          <Image src="/images/unilag-logo.png" alt="Logo" width={60} height={100} />
        </div>

        <ul className="list-none leading-[3rem]">
          {menuLinks.map((menu: INavMenu, index: number) => {

            const Icon = icons[menu.iconName];

            return (
                <li
                  key={index}
                  className={`px-4 transition-all hover:border-l-[10px] hover:border-[#B3FAFF] font-bold cursor-pointer ${pathname.includes(menu.route) ? 'border-l-[10px] border-[#B3FAFF] bg-white text-primary mr-[2px]' : 'text-white '}`}
                >
                  <Link href={menu.route} className="w-full flex items-center gap-[.5rem]">
                    { Icon && <Icon className="w-5 h-5" /> }
                    { menu.label }
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>

      <ul className="list-none leading-[3rem] text-white mb-12">
        <li className="px-4 transition-all cursor-pointer font-bold">
          <Link href="" className="w-full flex items-center gap-[.5rem]">
            <Settings />
            Settings
          </Link>
        </li>
        <li className="px-4 transition-all cursor-pointer font-bold" onClick={() => signAdminOut()}>
          <Link href="" className="w-full flex items-center gap-[.5rem]">
            <LogOut />
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
