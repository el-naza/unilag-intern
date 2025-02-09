'use client'
import { useRouter } from 'next/navigation'
import NavBar from '../../common/nav-bar'
import ArrowIcon from '../../assets/icons/arrow'
import Image from 'next/image'
import invitationImage from '../../assets/images/initation-image.png'
import TimeIcon from '../../assets/icons/time'
import { ReactNode } from 'react'
import CalenderIcon from '../../assets/icons/calander'
import OutlineLocation from '../../assets/icons/outlineLocation'
import CareerIcon from '../../assets/icons/career'
import PersonsIcon from '../../assets/icons/persons'
import InvitationCard from '../../components/Cards/invitationCard'

export default function InvitiationDetails() {
  const router = useRouter()

  interface DataItem {
    title: string
    value: string
    icon: ReactNode
  }

  const data: DataItem[] = [
    {
      title: 'Post Date',
      value: '1st January 2025',
      icon: <TimeIcon />,
    },
    {
      title: 'Start Date',
      value: '10th -25th July 2025',
      icon: <CalenderIcon />,
    },
    {
      title: 'Location',
      value: 'Ikeja, Lagos',
      icon: <OutlineLocation />,
    },
    {
      title: 'Career Area',
      value: 'Marketing',
      icon: <CareerIcon />,
    },
    {
      title: 'Total Applications',
      value: '12,000 Applicane',
      icon: <PersonsIcon />,
    },
  ]

  const invitationData = [
    {
      image: invitationImage.src,
      title: 'Career Area: Marketing',
      description: 'Interview Scheduled: 10:30am, 25th July 2025',
      date: '01/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Design',
      description: 'Interview Scheduled: 11:00am, 26th July 2025',
      date: '02/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Marketing',
      description: 'Interview Scheduled: 10:30am, 25th July 2025',
      date: '01/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Design',
      description: 'Interview Scheduled: 11:00am, 26th July 2025',
      date: '02/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Marketing',
      description: 'Interview Scheduled: 10:30am, 25th July 2025',
      date: '01/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Design',
      description: 'Interview Scheduled: 11:00am, 26th July 2025',
      date: '02/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Marketing',
      description: 'Interview Scheduled: 10:30am, 25th July 2025',
      date: '01/01/25',
    },
    {
      image: invitationImage.src,
      title: 'Career Area: Design',
      description: 'Interview Scheduled: 11:00am, 26th July 2025',
      date: '02/01/25',
    },
  ]

  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar fill="#0B7077" />
      </nav>
      <div className=" max-w-[866px] m-auto lg:mt-[58px] ">
        <button
          className="flex items-center gap-[6px] font-[400] text-[14px] p-[24px] lg:p-0"
          onClick={() => router.back()}
        >
          <ArrowIcon />
          Back
        </button>

        <div className="gap-5 lg:flex-row md:flex-row px-[10px] py-[6px]">
          <h3 className="font-[700] text-[14px] mb-[20px] px-4 lg:px-0">Invitation Details</h3>

          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 px-4 lg:px-0">
            <div className="h-[217px] w-full sm:w-[310px] border relative overflow-hidden">
              <Image src={invitationImage} alt="image" layout="fill" objectFit="cover" />
            </div>

            <div className="max-w-full lg:max-w-[536px]">
              <h3 className="font-[700] text-[16px] mb-4">Description</h3>
              <p className="font-[400] text-[14px] text-[#48484A] mb-4">
                CMR Shopping Mall is a premier retail and lifestyle destination that redefines the
                shopping and entertainment experience. Located at the heart of [Insert Location],
                CMR is designed to cater to diverse needs, offering a vibrant mix of retail, dining,
                entertainment, and leisure all under one roof.
              </p>

              <div className="mt-6 flex items-center justify-start flex-wrap gap-6 ">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="text-[14px] font-[400] text-start w-full sm:w-[150px] mb-4"
                  >
                    {item.icon}
                    <p className="text-[#0B7077] my-2">{item.title}</p>
                    <p className="text-[#48484A]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-[700] text-[16px] mb-4">Requirements</h3>
                <div className="font-[400] text-[14px] text-[#48484A] flex flex-col gap-4">
                  <p>
                    To apply for your SIWES placement at CMR Shopping Mall, applicants must meet the
                    following requirements:
                  </p>

                  <div className="flex items-start gap-3">
                    • Educational Background: Currently enrolled in a tertiary institution
                    (University, Polytechnic, or College of Education) and studying a relevant
                    course such as Business Administration, Marketing, Accounting, or any related
                    field.
                  </div>

                  <div className="flex items-start gap-3">
                    • SIWES Eligibility: Must be approved for SIWES by your institution and provide
                    proof of eligibility, such as an SIWES introductory letter from your school.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[20px] pb-[100px]">
            <h4 className="font-[700] text-[14px]">Application</h4>
            <div
              className="mt-[12px] p-[12px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[14px]  max-h-[500px] overflow-y-auto scrollbar-hide  "
              style={{ scrollbarWidth: 'none' }}
            >
              {' '}
              {invitationData.map((invitation, i) => (
                <InvitationCard key={i} invitation={invitation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
