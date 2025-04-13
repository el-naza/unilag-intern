'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import SearchIcon from '../../assets/icons/search'
import InputField from '../../components/Form/inputField'
import { useEffect, useState } from 'react'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
export default function AllInterns() {
  const [loading, setLoading] = useState<boolean>(true)
  const [students, setStudents] = useState<any>([])

  const findStudent = async () => {
    const res: any = await fetchDocs('employments')
    const getAccpetedInterns = res?.docs?.filter((s: any) => s.status === 'Accept')
    console.log(res)
    setStudents(getAccpetedInterns? getAccpetedInterns : [])
    setLoading(false)
  }

  useEffect(() => {
    findStudent()
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
        <div className="w-full">
          <div className="max-w-full right-0 left-0 px-4  absolute top-[200px] flex items-center justify-center ">
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <Loader height="auto" background="transparent" />
              </div>
            ) : (
              <div className="lg:w-[866px]">
                <div className="w-full py-[7px] flex items-center justify-between ">
                  <p className=" font-[500] text-[20px] text-white ">Interns List</p>
                  <div className="max-w-[350px] max-h-[40px]  border border-[#B3FAFF] shadow-xs overflow-hidden flex items-center justify-center rounded-[8px] ">
                    <InputField placeholder="Search " Icon={SearchIcon} type="text" />
                  </div>
                </div>
                <div
                  className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] p-[12px] border border-white rounded-[12px]"
                  style={{
                    background: `linear-gradient(to bottom, white, rgba(250, 250, 250, 0.6), rgba(64, 138, 126, 0.12))`,
                  }}
                >
                  {students &&
                    students.map((student, index) => (
                      <StudentProfileCard
                        key={index}
                        student={{
                          firstName: student.student.firstName,
                          lastName: student.student.lastName,
                          course: student.student.course,
                        }}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
