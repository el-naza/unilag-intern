import React from 'react'
import Image from 'next/image'

type MessageCardProps = {
  image: any
  name: string
  message: string
  // date: string
  student?:any
}

const MessageList: React.FC<MessageCardProps> = ({ image, name, student, message }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3 p-[8px] mb-[8px] max-w-[80%]">
        <Image
          src={image}
          width={40}
          height={40}
          alt="image"
          objectFit="cover"
          className="rounded-full"
        />
        <div>
          <h4 className="mb-[4px] text-[#303030] text-[14px] font-[400]">{name}</h4>
          <p className="font-[400] text-[14px] text-[#686868]">{message}</p>
        </div>
      </div>
      {/* <p className="text-[#686868] font-[400] text-[14px]">{date}</p> */}
    </div>
  )
}

export default MessageList
