import Link from 'next/link'
import { usePathname } from 'next/navigation'

const StudentApplicationHeader = () => {
  const pathname = usePathname()
  return (
    <div className="bg-[#195F7E] p-4 mt-5 mb-10">
      <div className="grid grid-cols-6 gap-2">
        <Link href={'/student/applications/pending'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/pending' ? 'rounded-xl bg-[#0B7077]' : ''}`}
          >
            Pending Application
          </div>
        </Link>
        <Link href={'/student/applications/approved'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/approved' ? 'rounded-xl bg-[#0B7077]' : ''}`}
          >
            Interviews
          </div>
        </Link>
        <Link href={'/student/applications/declined'}>
          <div
            className={`text-white text-center p-2 ${pathname === '/student/applications/declined' ? 'rounded-xl bg-[#0B7077]' : ''}`}
          >
            Rejected Applications
          </div>
        </Link>
      </div>
    </div>
  )
}

export default StudentApplicationHeader
