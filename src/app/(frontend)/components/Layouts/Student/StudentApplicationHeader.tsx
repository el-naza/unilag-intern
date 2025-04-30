import Link from 'next/link'
import { usePathname } from 'next/navigation'

const StudentApplicationHeader = () => {
  const pathname = usePathname()
  return (
    <div className="bg-[#195F7E] p-2 lg:p-4 mb-2 lg:mt-5 lg:mb-10">
      <div className="grid lg:grid-cols-5 gap-2">
        <Link href={'/student/applications/pending'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/pending' ? 'rounded lg:rounded-xl bg-[#0B7077]' : ''}`}
          >
            Pending Applications
          </div>
        </Link>
        <Link href={'/student/applications/interviews'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/interviews' ? 'rounded lg:rounded-xl bg-[#0B7077]' : ''}`}
          >
            Interviews
          </div>
        </Link>
        {/* <Link href={'/student/applications/approved'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/approved' ? 'rounded-xl bg-[#0B7077]' : ''}`}
          >
            Accepted Interviews
          </div>
        </Link> */}

        <Link href={'/student/applications/declined'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/declined' ? 'rounded lg:rounded-xl bg-[#0B7077]' : ''}`}
          >
            Rejected Interviews
          </div>
        </Link>
        <Link href={'/student/applications/employment-offers'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/employment-offers' ? 'rounded lg:rounded-xl bg-[#0B7077]' : ''}`}
          >
            Internship Offers
          </div>
        </Link>
      </div>
    </div>
  )
}

export default StudentApplicationHeader
