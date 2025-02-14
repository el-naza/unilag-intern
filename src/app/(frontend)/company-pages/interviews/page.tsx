'use client'
import hero from '../../assets/images/company-hero-bg.png'
import invitationImage from '../../assets/images/initation-image.png'
import NavBar from '../../common/nav-bar'
import PlusIcon from '../../assets/icons/plus'
import InvitationCard from '../../components/Cards/invitationCard'
import BlurBackground from '../../components/Layout/blurBackground'
import InvitationTabs from '../../components/Ui/tab'
export default function Interviews() {
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
        <div className="max-w-full right-0 left-0  lg:w-[866px] m-auto  absolute top-[200px] flex items-center justify-center px-4">
          <div className="w-full">
           
            <InvitationTabs />
            <BlurBackground>
              <div
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[14px] max-h-[500px] overflow-y-auto scrollbar-hide "
                style={{ scrollbarWidth: 'none' }}
              >
                {invitationData.map((invitation, i) => (
                  <InvitationCard key={i} invitation={invitation} />
                ))}
              </div>
            </BlurBackground>
          </div>
        </div>
      </div>
    </div>
  )
}
