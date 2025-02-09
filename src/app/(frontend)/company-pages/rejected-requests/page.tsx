'use client'
import NavBar from '../../common/nav-bar'
import hero from '../../assets/images/company-hero-bg.png'
import invitationImage from '../../assets/images/initation-image.png'
import { useState } from 'react'
import PlusIcon from '../../assets/icons/plus'
import Table from '../../components/table'
import BlurBackground from '../../components/Layout/blurBackground'
import InvitationTabs from '../../components/Ui/tab'

export default function RejectedRequest() {
  const [currentPage, setCurrentPage] = useState(1)

  const headers = ['Student Name', 'Application', 'Rejected Date']

  const tableData = [
    {
      id: 1,
      name: 'Omkar Lucas',
      imageUrl: invitationImage.src,
      application: 'Enclosed are my CV and required documents.',
      date: '02/03/2023',
    },
    {
      id: 2,
      name: 'Jane Doe',
      imageUrl: invitationImage.src,
      application: 'Submitted all required materials for review.',
      date: '03/15/2023',
    },
    {
      id: 3,
      name: 'John Smith',
      imageUrl: invitationImage.src,
      application: 'Application includes all necessary documents.',
      date: '04/10/2023',
    },
    {
      id: 4,
      name: 'Maria Gonzalez',
      imageUrl: invitationImage.src,
      application: 'Attached are my credentials and required forms.',
      date: '05/22/2023',
    },
    {
      id: 5,
      name: 'Alex Johnson',
      imageUrl: invitationImage.src,
      application: 'Here is my completed application for review.',
      date: '06/18/2023',
    },
  ]
  const rows = tableData.map((item) => [
    <div key={`${item.id}-name`} className="flex items-center">
      <img src={item.imageUrl} alt={item.name} className="w-8 h-8 rounded-full mr-2" />
      {item.name}
    </div>,
    <p key={`${item.id}-application`} className="text-[12px] font-[400]">
      {item.application}
    </p>,
    <p key={`${item.id}-date`} className="text-[12px] font-[400]">
      {item.date}
    </p>,
  ])

  const totalPages = tableData.length
  const totalItems = 1234

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    console.log('Page changed to:', page)
  }

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
        <div className="max-w-full right-0 left-0 lg:max-w-[866px] m-auto  absolute top-[200px] flex items-center justify-center px-4 lg:px-0">
          <div className="w-full">
            <InvitationTabs />
            <BlurBackground>
              <p className="px-4 font-[400] text-[16px]"> Internship Request</p>
              <div className="mt-[12px]">
                <Table
                  headers={headers}
                  rows={rows}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  onPageChange={handlePageChange}
                />
              </div>
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
