'use client'

import Image from 'next/image'
import ChatIcon from '../../assets/icons/chat'
import SaveIcon from '../../assets/icons/save'
import CompanyProfileHero from '../../components/Hero/companyProfleHero'
import React, { useState } from 'react'
import studentPhoto from '.././../assets/images/happy-smile.svg'
import MainButton from '../../components/Ui/button'
import CancelIcon from '../../assets/icons/cancel'
import SuppervisorIcon from '../../assets/icons/suerpervisor'

interface Category {
  category: string
}

const reportCategory: Category[] = [
  { category: 'all' },
  { category: 'suspended' },
  { category: 'complete' },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const chats = [
    {
      id: 1,
      name: 'Zaire Philips',
      date: 'March 24',
      message: 'I just subscribed to your profile. Do you wanna do a collab?',
      photo: studentPhoto,
      isUnread: true,
    },
    {
      id: 2,
      name: 'John Doe',
      date: 'March 22',
      message: 'Thank you for your help!',
      photo: studentPhoto,
      isUnread: false,
    },
    {
      id: 3,
      name: 'Jane Smith',
      date: 'March 20',
      message: 'Let’s discuss the next steps for the project.',
      photo: studentPhoto,
      isUnread: false,
    },
  ]
  return (
    <div className="w-full">
      <CompanyProfileHero />
      <div className="w-full max-w-[1600px] mx-auto mt-[20px] md:mt-[40px] shadow rounded-[23px] py-[40px] sm:py-[60px] text-black px-4">
        {/* Reports Header */}
        <div className="mb-[40px] sm:mb-[60px] mx-auto h-auto flex flex-col sm:flex-row items-center sm:items-end justify-between bg-[#F9F9FC] px-[20px] py-[20px] rounded-[23px]">
          <h3 className="font-[700] text-[24px] sm:text-[32px] mb-4 sm:mb-0">Reports</h3>
          <button className="flex items-center gap-[10px] sm:gap-[18px] px-[16px] py-[12px] bg-[#0B7077] rounded-[4px] text-white font-[500] text-[14px]">
            <ChatIcon /> New Message
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col lg:flex-row gap-4  lg:w-[70%]">
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div className="flex gap-2 flex-wrap">
                {reportCategory.map((c) => (
                  <button
                    key={c.category}
                    onClick={() => setActiveCategory(c.category)}
                    className={`p-2 text-[#545454] font-[400] text-[14px] rounded-[10px] ${
                      activeCategory === c.category ? 'bg-[#C7C7F9]' : 'bg-gray-300'
                    }`}
                  >
                    {c.category}
                  </button>
                ))}
              </div>

              {/* Chats */}
              <div className="mt-[16px]">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`w-full border-b p-4 flex items-start gap-2 ${
                      chat.isUnread ? 'bg-[#F1F1FF]' : 'bg-white'
                    }`}
                  >
                    <figure className="h-[48px] w-[48px] rounded-full">
                      <Image
                        src={chat.photo}
                        alt={chat.name}
                        layout="responsive"
                        width={0}
                        height={0}
                        className="object-cover rounded"
                      />
                    </figure>
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <p className={`text-[14px] ${chat.isUnread ? 'font-[600]' : 'font-[400]'}`}>
                          {chat.name}
                        </p>
                        <p className="font-[400] text-[12px] sm:text-[14px] text-[#686868]">
                          {chat.date}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p
                          className={`text-[14px] text-[#686868] w-[80%] overflow-hidden whitespace-nowrap text-ellipsis ${
                            chat.isUnread ? 'font-bold' : 'font-[400]'
                          }`}
                        >
                          {chat.message}
                        </p>
                        <SaveIcon />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-[#FAFAFA] shadow-sm rounded p-4 text-black">
              <div className="flex items-center gap-[13px] mb-4">
                <figure className="h-[48px] w-[48px] rounded-full ">
                  <Image
                    src={studentPhoto}
                    alt="Student"
                    layout="responsive"
                    width={0}
                    height={0}
                    className="object-cover rounded"
                  />
                </figure>

                <div>
                  <p className="font-[600] text-[14px] mb-[6px]">Zaire Philips</p>
                  <p className="font-[400] text-[14px]">
                    I just subscribed your profile. Do you wanna do a collab?
                  </p>
                </div>
              </div>

              <div className="bg-[#F1F1F1] w-full mt-[30px] p-[20px] rounded-[4px] border border-[#E4E4E4] ">
                <div className="flex items-center gap-1 mb-[20px]">
                  <SuppervisorIcon />
                  <p className="font-[500] text-[16px]">Supervisor React</p>
                </div>
                <div className="max-w-[286px] bg-white my-2 p-3 flex items-center justify-between rounded-[4px]">
                  <p className="font-[600] text-black text-[14px]">Good</p>
                  <button>
                    <CancelIcon />
                  </button>
                </div>
              </div>

              <div className="bg-[#F1F1F1] w-full p-4 rounded-[4px] border-[#E4E4E4] border">
                <div className="bg-white p-2 ">
                  <textarea
                    className="w-full outline-none rounded-[4px] "
                    placeholder="Type message"
                    maxLength={32}
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <MainButton title="Send" />
                  </div>
                </div>
                <p className="text-[#00000063] font-[400] text-[12px] mt-[4px]">
                  Not less than 32 words
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1>Advert</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
