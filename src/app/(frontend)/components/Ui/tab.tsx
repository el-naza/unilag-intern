import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PlusIcon from '../../assets/icons/plus'

export default function InvitationTabs() {
  const pathname = usePathname() // Get current path
  const router = useRouter()
  const [active, setActive] = useState<string>('Internship Post')

  const careers = [
    { title: 'Internship Post', path: '/company-pages/internship-post' },
    { title: 'Interviews', path: '/company-pages/awaiting-interview' },
    { title: 'Internship Request', path: '/company-pages/internship-request', total: '2' },
    { title: 'Rejected Request', path: '/company-pages/rejected-requests' },
  ]

  useEffect(() => {
    const activeTab = careers.find((c) => c.path === pathname)
    if (activeTab) {
      setActive(activeTab.title)
    }
  }, [pathname])

  const handleTabClick = (path: string, title: string) => {
    setActive(title)
    router.push(path)
  }

  return (
    <div className="w-full">
      <div className="py-[7px] flex items-center justify-between mb-[12px]">
        <p className=" font-[500] text-[20px] text-white ">Invitation</p>

        <button
          className="bg-[#0B7077] py-[6px] px-[12px] text-white font-[400] text-[12px] flex items-center gap-2"
          onClick={() => router.push('/company-pages/post-internship')}
        >
          <PlusIcon /> Internship post
        </button>
      </div>
      <div className="flex items-center flex-wrap">
        {careers.map((c) => (
          <button
            key={c.title}
            className={`py-[6px] px-[20px] rounded-[32px] font-[400] text-[12px] text-[#FFFFFF] flex items-center gap-[8px] ${
              active === c.title ? 'bg-[#0B7077]' : ''
            }`}
            onClick={() => handleTabClick(c.path, c.title)}
          >
            {c.title}

            {c.total && (
              <span className="h-[17px] w-[17px] rounded-full bg-[#FF3B30] font-[10px] text-[10px] flex items-center justify-center">
                {c.total}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
