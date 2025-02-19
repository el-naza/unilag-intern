'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-image.png'
import { useEffect, useState } from 'react'
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
export default function AwaitingInterview() {
  const [loading, setLoading] = useState<boolean>(true)
  const [internshipApplicants, setInternshipApplicants] = useState<any[]>([])
  const router = useRouter()

  const fetchInternshipApplicants = async () => {
    try {
      const res: any = await fetchDocs('interview-invitations')
      if (res) {
        console.log(res.data.docs)
        // const getPending = res.data.docs.filter((s) => s.status === 'accepted')
        // console.log(getPending)
        setInternshipApplicants(res?.data?.docs || [])
      } else {
        console.warn('No internship data found:', res)
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
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-end gap-[14px] mt-[12px]">
                  {internshipApplicants &&
                    internshipApplicants.map((invitation, i) => (
                      <AwaitingInterviewCard
                        key={invitation.id}
                        awaitingInterview={{
                          firstName: invitation.student.firstName,
                          lastName: invitation.student.lastName,
                          dateTime: invitation.dateTime,
                          status: invitation.dateTime,
                          clickAccept: () => handleRespond(invitation.id, 'accepted'), // Corrected function reference
                          clickDecline: () => handleRespond(invitation.id, 'declined'), // Corrected function reference
                          viewClick: () =>
                            router.push(`/company-pages/student-details/${invitation.student.id}`), // Placeholder function
                          rescheduleClick: () =>
                            router.push(
                              `/company-pages/student-details/${invitation.student.id}/invite`,
                            ), 
                        }}
                      />
                    ))}
                </div>
              )}
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
