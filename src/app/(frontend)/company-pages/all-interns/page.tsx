'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import SearchIcon from '../../assets/icons/search'
import InputField from '../../components/Form/inputField'
export default function AllInterns() {
  const students = [
    {
      name: 'Kotu Faruq',
      course: 'Mathematics',
      cgpa: '3.5',
      image: studentImage.src,
    },
    {
      name: 'Jane Doe',
      course: 'Physics',
      cgpa: '3.8',
      image: studentImage.src,
    },
    {
      name: 'John Smith',
      course: 'Engineering',
      cgpa: '3.6',
      image: studentImage.src,
    },
    {
      name: 'Kotu Faruq',
      course: 'Mathematics',
      cgpa: '3.5',
      image: studentImage.src,
    },
    {
      name: 'Jane Doe',
      course: 'Physics',
      cgpa: '3.8',
      image: studentImage.src,
    },
    {
      name: 'John Smith',
      course: 'Engineering',
      cgpa: '3.6',
      image: studentImage.src,
    },
    {
      name: 'Kotu Faruq',
      course: 'Mathematics',
      cgpa: '3.5',
      image: studentImage.src,
    },
    {
      name: 'Jane Doe',
      course: 'Physics',
      cgpa: '3.8',
      image: studentImage.src,
    },
    {
      name: 'John Smith',
      course: 'Engineering',
      cgpa: '3.6',
      image: studentImage.src,
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
        <div className="max-w-full right-0 left-0 px-4  absolute top-[200px] flex items-center justify-center ">
          <div>
            <div className="py-[7px] flex items-center justify-between ">
              <p className=" font-[500] text-[20px] text-white ">Interns List</p>
              <div className="max-w-[350px] max-h-[40px]  border border-[#B3FAFF] shadow-xs overflow-hidden flex items-center justify-center rounded-[8px] ">
                <InputField placeholder="Search " Icon={SearchIcon} type="text" />
              </div>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] p-[12px] border border-white rounded-[12px]"
              style={{
                background: `linear-gradient(to bottom, white, rgba(250, 250, 250, 0.6), rgba(64, 138, 126, 0.12))`,
              }}
            >
              {students.map((student, index) => (
                <StudentProfileCard key={index} student={student as any} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
