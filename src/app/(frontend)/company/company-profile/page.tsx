// import hero from '@/app/(frontend)/images/company-profile- hero.svg'
import hero from '../../assets/images/company-profile-hero.png'
import Kit from '../../assets/icons/kit'
import FilterIcon from '../../assets/icons/filterIcon'
import StudentCard from '../../components/Cards'
import CompanyProfileHero from '../../components/Hero/companyProfleHero'
export default function Page() {
  const students = [
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Adenike Bolrunduro',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Adenike Bolrunduro',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Adenike Bolrunduro',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe',
    },
  ]
  return (
    <div>
      <CompanyProfileHero />

      <div className="w-full max-w-[1600px] mx-auto mt-[171px] px-4 lg:px-[50px]">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
          <h2 className="font-[700] text-[30px] lg:text-[45px] text-center lg:text-left">
            Recommended Student
          </h2>
          <div className="flex flex-wrap items-center gap-4 lg:gap-[30px] mt-4 lg:mt-0">
            <button className="h-[50px] w-[50px] lg:h-[67px] lg:w-[67px] rounded-full flex items-center justify-center bg-[#195F7E] border-4">
              <Kit />
            </button>
            <button className="shadow px-4 py-2 lg:px-[50px] lg:py-[15px] flex items-center gap-3 border-[#E3ECFB] font-[400] text-[12px] lg:text-[14px] text-[#717B9E] bg-[#FFFFFF] rounded-[12px]">
              <FilterIcon />
              Filter
            </button>
          </div>
        </div>
        <div className="mt-8 lg:mt-[55px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  xxl:grid-cols-4 gap-6 lg:gap-[]">
            {students.map((student, index) => (
              <StudentCard key={index} image={student.image} name={student.name} />
            ))}
          </div>
          {/* <div className="flex flex-wrap gap-6 lg:gap-[48px]">
            {students.map((student, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-32px)] xl:w-[calc(25%-32px)]"
              >
                <StudentCard image={student.image} name={student.name} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}
