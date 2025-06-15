'use client'
import hero from '../../assets/images/company-hero-bg.png'
import invitationImage from '../../assets/images/initation-image.png'
import NavBar from '../../common/nav-bar'
import PlusIcon from '../../assets/icons/plus'
import InvitationCard from '../../components/Cards/invitationCard'
import BlurBackground from '../../components/Layout/blurBackground'
import InvitationTabs from '../../components/Ui/tab'
import { useEffect, useState } from 'react'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import comapnyDefaultImage from '../../assets/images/company-default-image.avif'

export default function Interviews() {
  const [loading, setLoading] = useState<boolean>(true)
  const [internshipPosts, setInternshipPosts] = useState<any[]>([])

  const fetchInternshipPosts = async () => {
    try {
      const res: any = await fetchDocs('internships')
      console.log('res', res)

      if (res?.docs) {
        setInternshipPosts(res.docs)
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
    fetchInternshipPosts()
  }, [])

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
        <div className="max-w-full right-0 left-0  lg:w-[866px] m-auto  absolute top-[200px] flex items-center justify-center px-4">
          <div className="w-full">
            <InvitationTabs />
            <BlurBackground>
              {loading ? (
                <Loader height="auto" background="transparent" />
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[14px] max-h-[500px] overflow-y-auto scrollbar-hide "
                  style={{ scrollbarWidth: 'none' }}
                >
                  {internshipPosts?.length > 0 ? (
                    internshipPosts.map((post) => (
                      <InvitationCard
                        key={post.id}
                        invitation={{
                          id: post.id,
                          image: post?.company?.image || comapnyDefaultImage,
                          title: post.company.name,
                          description: post.postDescription || post.description,
                          date: new Date(post.startDate).toLocaleDateString(),
                        }}
                      />
                    ))
                  ) : (
                    <p>No internship data found</p>
                  )}
                </div>
              )}
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
