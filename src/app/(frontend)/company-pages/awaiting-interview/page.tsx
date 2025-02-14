'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-image.png'
import { useState } from 'react'
import NavBar from '../../common/nav-bar'
import PlusIcon from '../../assets/icons/plus'
import BlurBackground from '../../components/Layout/blurBackground'
import AwaitingInterviewCard from '../../components/Cards/awaitingInterview'
import InvitationTabs from '../../components/Ui/tab'
export default function AwaitingInterview() {
  const [active, setActive] = useState<string>('Internship Post')

  const invitationData = [
    {
      image: studentImage.src,
      status: 'Awaiting Interview',
      time: '10:30am, 25th July 2025',
    },
    {
      image: studentImage.src,
      status: '',
      time: '10:30am, 25th July 2025',
    },
    {
      image: studentImage.src,
      status: '',

      time: '10:30am, 25th July 2025',
    },
    {
      image: studentImage.src,
      status: 'Completed Interview',
      time: '10:30am, 25th July 2025',
    },
  ]

  const careers = [
    { title: 'Internship Post' },
    { title: 'Interviews' },
    { title: 'Internship Request ', total: '2' },
    { title: 'Rejected Request ' },
  ]

  return (
    <div className="pb-[600px]">
      <div className="relative ">
        <div
          className="relative"
          style={{
            backgroundImage: `url(${hero.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '418px',
            paddingBottom: '34px',
          }}
        >
          <nav className="text-[#FFFFFF]">
            <NavBar />
          </nav>
        </div>
        <div className="max-w-full right-0 left-0  lg:w-[866px] m-auto  absolute top-[200px] flex items-center justify-center px-4 lg:px-0">
          <div className="w-full">
            <InvitationTabs />

            <BlurBackground>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-end gap-[14px] mt-[12px]">
                {invitationData.map((invitation, i) => (
                  <AwaitingInterviewCard key={i} awaitingInterview={invitation} />
                ))}
              </div>
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
