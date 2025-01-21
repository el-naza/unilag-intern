'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MainButton from '../Ui/button'

interface StudentCardProps {
  image: string
  name: string
}

export default function StudentCard({ image, name }: StudentCardProps) {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/company/schedule')
  }

  return (
    <div className="lg:w-[346px] rounded-[26px] shadow-md flex-grow">
      <figure className=" rounded-tl-[26px] rounded-tr-[26px] w-full">
        <Image
          src={image}
          alt="Student"
          layout="responsive"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[100%] object-cover rounded rounded-tl-[26px] rounded-tr-[26px]"
        />
      </figure>
      <div className="py-[15px] px-[42px]">
        <p className="font-[700] text-[20px] text-[#000000]">{name}</p>
        <div className="mt-[59px] flex items-center justify-between gap-2">
          <MainButton title="Law" />
          <MainButton
            title="See more"
            backgroundColor="bg-transparent"
            color="text-[#0B7077]"
            fontWeight="font-[400]"
            handleClick={handleNavigation}
          />
        </div>
      </div>
    </div>
  )
}
