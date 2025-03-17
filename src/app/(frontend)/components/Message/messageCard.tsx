import React from 'react'
import Image from 'next/image'

type CardProps = {
  image: string
  title: string
  description: string
  timestamp: string
  onButtonClick?: () => void
}

const MessageCard: React.FC<CardProps> = ({
  image,
  title,
  description,
  timestamp,
  onButtonClick,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div>
        <div className="shadow-sm w-[290px] rounded">
          <Image
            src={image}
            alt="image"
            width={290}
            height={120}
            objectFit="cover"
            className="h-[120px]"
          />
          <div className="w-full p-[8px]">
            <h4 className="font-[700] text-[12px] mb-[4px]">{title}</h4>
            <p className="text-[#8E8E93] font-[400] text-[10px]">{description}</p>
          </div>
        </div>
        <p className="mt-[6px] text-[#667085] font-[400] text-[12px]">{timestamp}</p>
      </div>

      {/* <button
        className="p-[1px] rounded-full border outline-none h-[15px] w-[15px] flex items-center justify-center"
        onClick={onButtonClick}
      >
        <div className="bg-[#FF9500] rounded-full h-[9px] w-[9px]"></div>
      </button> */}
    </div>
  )
}

export default MessageCard
