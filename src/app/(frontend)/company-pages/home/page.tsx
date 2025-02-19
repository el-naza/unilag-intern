'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import { useEffect, useState } from 'react'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import { useRouter } from 'next/navigation'
export default function CompanyHomePage() {
  const [active, setActive] = useState<string>('  All Career Area')
  const careers = [
    { title: '  All Career Area' },
    { title: 'Science' },
    { title: 'Engineering' },
    { title: 'Business' },
    { title: 'Arts' },
    { title: 'Medicine' },
  ]

  const [loading, setLoading] = useState<boolean>(true)
  const [students, setStudents] = useState<any>([])

  const fetchStudents = async () => {
    const res: any = await fetchDocs('students')
    setStudents(res.docs)
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const router = useRouter()

  return (
    <div>
      <div
        className="relative"
        style={{
          backgroundImage: `url(${hero.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
          paddingBottom: '34px',
        }}
      >
        <nav className="text-[#FFFFFF]">
          <NavBar />
        </nav>

        <div className="mt-[67px]">
          <div className="max-w-[650px] m-auto flex items-center justify-center flex-col px-4">
            <p className="font-[500] text-[24px] leading-[29px] text-[#FFFFFF] max-w-[535px] text-center">
              Quickly Find the Right Students for Your Company!
            </p>
            <div className="mt-[32px] flex items-center justify-center lg:gap-3 flex-wrap">
              {careers &&
                careers.map((c) => (
                  <button
                    className={`p-[8px] rounded-[4px] font-[400] text-[14px] text-[#FFFFFF] ${
                      active === c.title ? 'bg-[#0B7077]' : ''
                    }`}
                    key={c.title}
                    onClick={() => setActive(c.title)}
                  >
                    {c.title}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full md:max-w-[866px] m-auto px-4 pb-[100px]">
        <p className="py-[7px] font-[500] text-[20px]">Student List</p>
        {loading ? (
          <Loader height="auto" background="transparent" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] p-[12px]">
            {students &&
              students.map((student) => <StudentProfileCard key={student.id} student={student} />)}
          </div>
        )}
      </div>
    </div>
  )
}
