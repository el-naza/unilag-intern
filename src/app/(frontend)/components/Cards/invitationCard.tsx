import Image from 'next/image'
import { useRouter } from 'next/navigation'

type InvitationCard = {
  id: string
  image?: string
  title?: string
  description?: string
  date?: string
}

type InvitationCardProps = {
  invitation: InvitationCard
}

export default function InvitationCard({ invitation }: InvitationCardProps) {
  const { image, title, description, date, id } = invitation
  const router = useRouter()
  return (
    <div>
      <div
        className="border border-[#F1F1F1] rounded-[8px] flex items-start justify-between gap-[5px] overflow-hidden w-full mb-4"
        onClick={() => router.push(`/company-pages/internship-post-details/${id}`)}
      >
        <div className="overflow-hidden w-[100px]">
          <Image
            src={image}
            alt="invitation"
            width={100}
            height={100}
            className="overflow-hidden rounded"
          />
        </div>
        <div className="px-[6px] w-[calc(100%-100px)]">
          <h3 className="font-[700] text-[#48484A] text-[14px]">{title}</h3>
          <p className="font-[400] text-[14px] text-black py-[2px] h-[50px] overflow-hidden text-ellipsis line-clamp-2">
            {description}
          </p>
          <p className="text-end text-[#007AFF] font-[400] text-[12px] float-right">{date}</p>
        </div>
      </div>
    </div>
  )
}
