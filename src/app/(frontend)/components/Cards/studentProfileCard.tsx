import { useRouter } from 'next/navigation'
import defaultProfileImage from '../../assets/images/profile-image.webp'
import Link from 'next/link'

type StudentProfile = {
  id?: string
  firstName?: string
  course?: string
  cgpa?: string
  image?: string
  lastName?: string
}

type StudentProfileCardProps = {
  student: StudentProfile
  // onClick?: (id: string) => void
}

export default function StudentProfileCard({ student }: StudentProfileCardProps) {
  const { id, firstName, course, cgpa, lastName, image } = student
  return (
    <Link href={`/company-pages/student-details/${id}`}>
      <div
        className="relative h-[240px] w-full text-white rounded-[4px] border overflow-hidden flex items-end cursor-pointer"
        style={{
          backgroundImage: image ? `url(${image})` : `url(${defaultProfileImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
        }}
      >
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="z-10 w-full text-white p-[8px]">
          <p className="font-[700] text-[14px] mb-[4px] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
            {firstName + ' ' + lastName}
          </p>

          <div className="flex items-center justify-between font-[400] text-[12px]">
            <p>{course}</p>
            <p>{cgpa} CGPA</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
