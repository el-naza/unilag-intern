import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CompanyCard = ({ company }: any) => {
  const router = useRouter()

  const enroll = () => {
    router.push(`/student/companies/${company.id}`)
  }

  return (
    <div className="shadow-lg rounded-[14px] bg-white">
      <div className="w-full relative">
        <Image
          src={company?.image?.url}
          onError={(event) => {
            event.currentTarget.src = '/images/company-1.png'
          }}
          alt="Company"
          width={1200}
          height={200}
          className="rounded-tl-[14px] rounded-tr-[14px]"
        />
        {/* <div className="w-full grid place-content-center absolute -bottom-[20px]">
              <AvatarGroup />
            </div> */}
      </div>
      <div className="pt-12 px-4 pb-16">
        <p className="mb-3">{format(new Date(company.createdAt), 'do MMMM yyyy')}</p>
        <h3 className="scroll-m-20 text-[1rem] font-bold tracking-tight text-secondary mb-3">
          {company.name}
        </h3>
        <p className="line-clamp-3">{company.description || '--'}</p>
      </div>

      <div className="flex justify-between px-4 mb-8">
        <div className="flex gap-3 items-center">
          {/* <h3 className="scroll-m-20 text-xl font-bold tracking-tight text-[#FD661F] text-[.8rem]">
                2 vacancies
              </h3> */}
        </div>
        <Button className="bg-primary text-white" onClick={() => enroll()}>
          Enroll Now
        </Button>
      </div>
    </div>
  )
}

export default CompanyCard
