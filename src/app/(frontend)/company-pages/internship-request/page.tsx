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
import Loader from '../../components/Layouts/Loader'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import studentImage from '../../assets/images/profile-image.webp'
import FileIcon from '../../assets/icons/file'
import fetchDoc from '@/services/fetchDoc'
import DownloadIcon from '../../assets/icons/download'
import DownloadFileIcon from '../../assets/icons/downloadFile'

interface InvitationDetails {
  message: string
  id: string
  student: { id: string }
}
export default function InternshipRequest() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)

  const [internReq, setInternReq] = useState<any>([])
  const [tableData, setTableData] = useState<any>([])
  const [invitationDetails, setInvitationDetails] = useState<InvitationDetails | null>(null)

  const fetchInternReq = async () => {
    const res: any = await fetchDocs('interview-invitations')
    console.log(res)
    setInternReq(res?.docs || [])
    setTableData(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchInternReq()
  }, [])

  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleOpenModal = async (student) => {
    const res: any = await fetchDoc('interview-invitations', student)
    setSelectedStudent(student)
    console.log(res)
    setInvitationDetails(res)
  }

  const handleCloseModal = () => {
    setSelectedStudent(null)
  }

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
      <div
        key={`${item.id}-name`}
        onClick={() => handleOpenModal(item.id)}
        className="flex items-center"
      >
        <img
          src={item.student.imageUrl || '/default-avatar.png'}
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
      <div key={`${item.id}-actions`}>
        <button
          className="text-green-500 hover:underline p-1 lg:mr-2 bg-white rounded-[100px] lg:py-[4px] px-[8px] w-[fit-content] text-nowrap"
          // onClick={() => router.push(`/company-pages/student-details/${item.student.id}`)}
          onClick={() => handleRespond(item.id, 'accepted')}
          disabled={respondToInterviewMtn.isPending}
        >
          Accept
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

  const totalPages = tableData?.length
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

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg lg:w-[800px] shadow">
            {invitationDetails ? (
              <>
                <div className="flex items-center justify-between">
                  <h4 className="font-[700] text-[14px]">Apllication Detail</h4>
                  <button onClick={handleCloseModal}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.08073 4.41233L8.60932 0.883739C8.86967 0.623389 9.29178 0.623389 9.55213 0.883739C9.81248 1.14409 9.81248 1.5662 9.55213 1.82655L6.02354 5.35514L9.55213 8.88374C9.81248 9.14409 9.81248 9.5662 9.55213 9.82655C9.29178 10.0869 8.86967 10.0869 8.60932 9.82655L5.08073 6.29795L1.55213 9.82655C1.29178 10.0869 0.869674 10.0869 0.609325 9.82655C0.348975 9.5662 0.348975 9.14409 0.609325 8.88374L4.13792 5.35514L0.609325 1.82655C0.348975 1.5662 0.348975 1.14409 0.609325 0.883739C0.869674 0.623389 1.29178 0.623389 1.55213 0.883739L5.08073 4.41233Z"
                        fill="#606778"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-10">
                  <div className="flex items-start flex-col gap-5 lg:flex-row">
                    <div className="max-w-[200px] md:max-w-full ">
                      <Image
                        src={studentImage}
                        alt="image"
                        width={0}
                        height={300}
                        // objectFit={'contain'}
                        className="h-[300px] w-full object-cover rounded-[20px]"
                      />
                    </div>
                    <div className="lg:w-[500px] w-full">
                      <h4 className="font-[700] text-[14px] mb-5">Apllication</h4>
                      <p
                        className="lg:h-[300px] overflow-y-scroll  text-[#606778] text-[14px]"
                        style={{ scrollbarWidth: 'none' }}
                      >
                        {invitationDetails?.message}
                      </p>
                      <h4 className="font-[700] text-[14px] my-5">Attachment</h4>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-2 text-[12px] lg:ml-5">
                          <FileIcon />
                          <p>Upload file</p>
                        </div>
                        <button>
                          <DownloadFileIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-10">
                    <button
                      onClick={() =>
                        router.push(
                          `/company-pages/student-details/${invitationDetails.student.id}`,
                        )
                      }
                      className="rounded-[6px] bg-[#0B7077] py-[10px] px-[14px] text-[12px] text-white"
                    >
                      Accept
                    </button>
                    <button className="rousnded-[6px] border border-[#0B7077] text-[#0B7077] py-[10px] px-[14px] text-[12px]">
                      Reject
                    </button>
                    <button
                      onClick={() => handleRespond(invitationDetails.id, 'declined')}
                      className="rounded-[6px]  text-[#0B7077] py-10px] px-[14px] text-[12px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Loader height="auto" background="transparent" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
