import Image from 'next/image'
import { useRouter } from 'next/navigation'

type InvitationCard = {
  image: string
  title: string
  description: string
  date: string
}

type InvitationCardProps = {
  invitation: InvitationCard
}

export default function InvitationCard({ invitation }: InvitationCardProps) {
  const { image, title, description, date } = invitation
  const router = useRouter()
  return (
    <div>
      <div
        className="border border-[#F1F1F1] rounded-[8px] flex items-start gap-[5px] overflow-hidden w-full mb-4"
        onClick={() => router.push('/company-pages/invitation-details')}
      >
        <div className="overflow-hidden">
          <Image
            src={image}
            alt="invitation"
            width={100}
            height={100}
            className="overflow-hidden rounded-tl-[8px] rounded-tr-[8px]"
          />
        </div>
        <div className="px-[6px]">
          <h3 className="font-[700] text-[#48484A] text-[14px]">{title}</h3>
          <p className="font-[400] text-[14px] text-[#8E8E93] py-[2px]">{description}</p>
          <p className="text-end text-[#007AFF] font-[400] text-[12px]">{date}</p>
        </div>
      </div>
    </div>
  )
}
