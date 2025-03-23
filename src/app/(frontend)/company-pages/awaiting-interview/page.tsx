'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-image.png'
import { useEffect, useMemo, useState } from 'react'
import NavBar from '../../common/nav-bar'
import PlusIcon from '../../assets/icons/plus'
import BlurBackground from '../../components/Layout/blurBackground'
import AwaitingInterviewCard from '../../components/Cards/awaitingInterview'
import InvitationTabs from '../../components/Ui/tab'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import { useMutation } from '@tanstack/react-query'
import updateDoc from '@/services/updateDoc'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import saveDoc from '@/services/saveDoc'
export default function AwaitingInterview() {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { data: session } = useSession()
  const user = useMemo<any>(() => session?.user, [session])

  const [awaitingInterviews, setAwaitingInterviews] = useState<any[]>([])
  const [completedInterviews, setCompletedInterviews] = useState<any[]>([])

  const fetchInternshipApplicants = async () => {
    try {
      const res: any = await fetchDocs('interview-invitations')
      if (res) {
        const getAcceptedInvitation = res?.docs.filter((s) => s.status === 'accepted')

        const now = new Date()

        const awaiting = getAcceptedInvitation.filter((inv) => new Date(inv.dateTime) >= now)
        const completed = getAcceptedInvitation.filter((inv) => new Date(inv.dateTime) < now)

        setAwaitingInterviews(awaiting)
        setCompletedInterviews(completed)
      } else {
        toast.success('No internship data found:', res)
      }
    } catch (error) {
      console.error('Error fetching internship posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInternshipApplicants()
  }, [])

  const respondToInterviewMtn = useMutation({
    mutationFn: async ({
      id,
      status,
      studentId,
    }: {
      id: string
      status: string
      studentId?: string
    }) => {
      try {
        console.log(id, status, studentId)
        const res = await updateDoc('interview-invitations', id, { status })

        console.log(res)
        if (!res) {
          return toast.error('Network error; please try again later')
        }

        // If the company accepts, create an employment document
        if (status === 'company accepted') {
          const createEmployment = await saveDoc('employments', {
            student: studentId,
            company: user?.id,
          })

          console.log('Employment record created:', createEmployment)

          if (!createEmployment) {
            return toast.error('Failed to create employment record')
          }
        }
        console.log(res)

        return res
      } catch (error) {
        console.error('Error updating interview invitation:', error)
        toast.error('An error occurred while updating; please try again later')
      }
    },
  })

  const handleRespond = async (id: string, status: string, studentId?: string) => {
    await respondToInterviewMtn.mutateAsync({ id, status, studentId })
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
        <div className="max-w-full right-0 left-0  lg:w-[866px] m-auto  absolute top-[200px] flex items-center justify-center px-4 lg:px-0">
          <div className="w-full">
            <InvitationTabs />

            <BlurBackground>
              {loading ? (
                <Loader height="auto" background="transparent" />
              ) : (
                <div>
                  <div className="bg-white p-[6px] m-auto mt-[12px]">
                    <h3 className="font-[400] text-[16px] text-[#48484A]">Awaiting interview</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-end gap-[14px] mt-[12px]">
                    {awaitingInterviews.map((invitation) => (
                      <AwaitingInterviewCard
                        key={invitation.id}
                        awaitingInterview={{
                          image: invitation.student?.image?.url || studentImage,
                          firstName: invitation.student.firstName,
                          lastName: invitation.student.lastName,
                          dateTime: invitation.dateTime,
                          status: invitation.status,
                          clickAccept: () =>
                            handleRespond(
                              invitation.id,
                              'company accepted',
                              invitation?.student?.id,
                            ),
                          clickDecline: () => handleRespond(invitation.id, 'company declined'),
                          viewClick: () =>
                            router.push(`/company-pages/student-details/${invitation.student.id}`),
                          rescheduleClick: () =>
                            router.push(
                              `/company-pages/student-details/${invitation.student.id}/invite`,
                            ),
                        }}
                      />
                    ))}
                  </div>

                  <div className="bg-white p-[6px] m-auto mt-[12px]">
                    <h3 className="font-[400] text-[16px] text-[#48484A]">Completed interview</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-end gap-[14px] mt-[12px]">
                    {completedInterviews.map((invitation) => (
                      <AwaitingInterviewCard
                        key={invitation.id}
                        awaitingInterview={{
                          image: invitation.student?.image?.url || studentImage,
                          firstName: invitation.student.firstName,
                          lastName: invitation.student.lastName,
                          dateTime: invitation.dateTime,
                          status: invitation.status,
                          clickAccept: () =>
                            handleRespond(
                              invitation.id,
                              'company accepted',
                              invitation?.student?.id,
                            ),
                          clickDecline: () => handleRespond(invitation.id, 'company declined'),
                          viewClick: () =>
                            router.push(`/company-pages/student-details/${invitation.student.id}`),
                          rescheduleClick: () =>
                            router.push(
                              `/company-pages/student-details/${invitation.student.id}/invite`,
                            ),
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
