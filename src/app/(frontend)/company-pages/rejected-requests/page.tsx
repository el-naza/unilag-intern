'use client'
import NavBar from '../../common/nav-bar'
import hero from '../../assets/images/company-hero-bg.png'
import invitationImage from '../../assets/images/initation-image.png'
import { useEffect, useState } from 'react'
import PlusIcon from '../../assets/icons/plus'
import Table from '../../components/table'
import BlurBackground from '../../components/Layout/blurBackground'
import InvitationTabs from '../../components/Ui/tab'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import studentImage from '../../assets/images/profile-image.webp'

export default function RejectedRequest() {
  const [currentPage, setCurrentPage] = useState(1)

  const headers = ['Student Name', 'Application', 'Date', '']

  const [loading, setLoading] = useState<boolean>(true)

  const [internReq, setInternReq] = useState<any>([])
  const [tableData, setTableData] = useState<any>([])

  const fetchInternReq = async () => {
    const res: any = await fetchDocs('internship-applications')
    // console.log(res)
    const getRejected = res?.docs.filter((s: any) => s.status === 'company declined')
    console.log(getRejected)
    setInternReq(getRejected ? getRejected : [])
    setTableData(res ? res : null)
    setLoading(false)
  }

  useEffect(() => {
    fetchInternReq()
  }, [])

  const rows =
    internReq &&
    internReq.map((item) => [
      <div
        key={`${item.id}-name`}
        // onClick={() => handleOpenModal(item.id)}
        className="flex items-center"
      >
        <img
          src={item.student?.image?.url ? item.student.image.url : studentImage.src}
          alt={item.student.firstName}
          className="w-8 h-8 rounded-full mr-2"
        />
        {`${item.student.firstName} ${item.student.lastName}`}
      </div>,
      <p
        key={`${item.id}-application`}
        className="text-[12px] font-[400] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {item.message}
      </p>,
      <p key={`${item.id}-date`} className="text-[12px] font-[400]">
        {new Date(item.createdAt).toLocaleDateString()}
      </p>,
    ])

  const totalPages = tableData?.length
  const totalItems = 1234

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
              {loading ? (
                <Loader height="auto" background="transparent" />
              ) : (
                <div className="mt-[12px]">
                  <Table
                    headers={headers}
                    rows={rows}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    // onPageChange={handlePageChange}
                  />
                </div>
              )}
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
