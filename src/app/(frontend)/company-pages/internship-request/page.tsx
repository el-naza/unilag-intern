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
import { toast } from 'sonner'
import updateDoc from '@/services/updateDoc'
import { useMutation } from '@tanstack/react-query'
import { InterviewInvitation } from '@/payload-types'
import Loader from '../../components/Layouts/Loader'

export default function InternshipRequest() {
  const [loading, setLoading] = useState<boolean>(true)

  const [internReq, setInternReq] = useState<any>([])
  const [tableData, setTableData] = useState<any>([])

  // const fetchInternReq = async () => {
  //   const res: any = await fetchDocs('interview-invitations')
  //   setInternReq(res)
  //   console.log(internReq)
  //   setLoading(false)
  // }

  const fetchInternReq = async () => {
    const res: any = await fetchDocs('interview-invitations')
    setInternReq(res?.data?.docs || [])
    setTableData(res?.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchInternReq()
  }, [])

  // const respondToInterviewMtn = useMutation({
  //   mutationFn: async (interviewInvitation: InterviewInvitation) => {
  //     try {
  //       console.log(interviewInvitation)
  //       const res = await updateDoc(
  //         'interview-invitations',
  //         interviewInvitation.id,
  //         interviewInvitation,
  //       )
  //       console.log('res', res)
  //       if (!res) return toast.error('Network err; pls try again later')
  //       return res
  //     } catch {
  //       toast.error('An error occured while updating; pls try again later')
  //     }
  //   },
  // })

  const respondToInterviewMtn = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      try {
        console.log('Updating interview invitation:', { id, status })

        const res = await updateDoc('interview-invitations', id, { status })

        console.log('Response:', res)
        if (!res) return toast.error('Network error; please try again later')

        return res
      } catch {
        toast.error('An error occurred while updating; please try again later')
      }
    },
  })

  const handleRespond = async (id: string, status: string) => {
    await respondToInterviewMtn.mutateAsync({ id, status })
  }

  const [currentPage, setCurrentPage] = useState(1)

  const headers = ['Student Name', 'Application', 'Date', '']

  const rows =
    internReq &&
    internReq.map((item) => [
      <div key={`${item.id}-name`} className="flex items-center">
        <img
          src={item.student.imageUrl || '/default-avatar.png'}
          alt={item.student.firstName}
          className="w-8 h-8 rounded-full mr-2"
        />
        {`${item.student.firstName} ${item.student.lastName}`}
      </div>,
      <p key={`${item.id}-application`} className="text-[12px] font-[400]">
        {item.company.name}
      </p>,
      <p key={`${item.id}-date`} className="text-[12px] font-[400]">
        {new Date(item.createdAt).toLocaleDateString()}
      </p>,
      <div key={`${item.id}-actions`}>
        <button
          className="text-green-500 hover:underline p-1 lg:mr-2 bg-white rounded-[100px] lg:py-[4px] px-[8px] w-[fit-content] text-nowrap"
          onClick={() => handleRespond(item.id, 'accepted')}
          disabled={respondToInterviewMtn.isPending}
        >
          ✔ Accept
        </button>
        <button
          className="text-red-500 hover:underline p-1 bg-white rounded-[100px] lg:py-[4px] lg:px-[8px]"
          onClick={() => handleRespond(item.id, 'declined')}
          disabled={respondToInterviewMtn.isPending}
        >
          ✘ Declne
        </button>
      </div>,
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
                    onPageChange={handlePageChange}
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
