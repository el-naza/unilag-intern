// 'use client'
// import hero from '../../assets/images/company-hero-bg.png'
// import studentImage from '../../assets/images/student-image.png'
// import { useState } from 'react'
// import NavBar from '../../common/nav-bar'
// import BlurBackground from '../../components/Layout/blurBackground'
// import Image from 'next/image'
// import MessageList from '../../components/Message/messageList'
// import MessageCard from '../../components/Message/messageCard'
// import Kit from '../../assets/icons/kit'
// import SendIcon from '../../assets/icons/send'
// export default function Reports() {
//   const [active, setActive] = useState<string>('All Report')
//   const messageList = [
//     {
//       image: studentImage.src,
//       name: 'Zaire Philips',
//       message: 'I just subscribed to your profile. Do you wanna do a collab?',
//       date: 'March 24',
//     },
//     {
//       image: studentImage.src,
//       name: 'Anna Doe',
//       message: 'Can we schedule a meeting for next week?',
//       date: 'March 25',
//     },
//   ]

//   const cards = [
//     {
//       image: studentImage.src,
//       title: 'Prepare a Market Analysis Report',
//       description:
//         'Gain valuable insights into market trends, competitors, and growth opportunities with this analysis report.',
//       timestamp: 'Friday 2:20pm',
//       onButtonClick: () => alert('Button clicked for Market Analysis Report'),
//     },
//     {
//       image: studentImage.src,
//       title: 'Design a New Website Layout',
//       description: 'Explore innovative design layouts that enhance user experience and engagement.',
//       timestamp: 'Monday 11:00am',
//       onButtonClick: () => alert('Button clicked for Website Layout'),
//     },
//     {
//       image: studentImage.src,
//       title: 'Design a New Website Layout',
//       description: 'Explore innovative design layouts that enhance user experience and engagement.',
//       timestamp: 'Monday 11:00am',
//       onButtonClick: () => alert('Button clicked for Website Layout'),
//     },
//     {
//       image: studentImage.src,
//       title: 'Design a New Website Layout',
//       description: 'Explore innovative design layouts that enhance user experience and engagement.',
//       timestamp: 'Monday 11:00am',
//       onButtonClick: () => alert('Button clicked for Website Layout'),
//     },
//   ]

//   const careers = [{ title: 'All Report' }, { title: 'Reassigned' }, { title: 'Approved' }]

//   return (
//     <div className="pb-[600px] ">
//       <div className="relative ">
//         <div
//           className="relative"
//           style={{
//             backgroundImage: `url(${hero.src})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: '418px',
//             paddingBottom: '34px',
//           }}
//         >
//           <nav className="text-[#FFFFFF]">
//             <NavBar />
//           </nav>
//         </div>
//         <div className="max-w-full right-0 left-0  lg:w-[866px] m-auto  absolute top-[200px] flex items-center justify-center ">
//           <div className="w-full">
//             <p className="py-[7px]  font-[500] text-[20px] text-white ">Reports</p>

//             <BlurBackground background="bg-[#fafafa]">
//               <div className="flex items-start gap-[14px] mt-[12px] ">
//                 <div className="lg:w-[350px] ">
//                   <div className="flex items-center mb-[28px] ">
//                     {careers &&
//                       careers.map((c) => (
//                         <button
//                           className={`py-[6px] px-[20px] rounded-[32px] font-[400] text-[12px]  flex items-center gap-[8px]  ${
//                             active === c.title ? 'bg-[#0B7077] text-[#FFFFFF]' : ''
//                           }`}
//                           key={c.title}
//                           onClick={() => setActive(c.title)}
//                         >
//                           {c.title}
//                         </button>
//                       ))}
//                   </div>
//                   <div className="w-full">
//                     <div
//                       className="flex flex-col items-center gap-[8px] max-h-[500px] overflow-y-auto scrollbar-hide"
//                       style={{ scrollbarWidth: 'none' }}
//                     >
//                       {messageList.map((msg, index) => (
//                         <MessageList
//                           key={index}
//                           image={msg.image}
//                           name={msg.name}
//                           message={msg.message}
//                           date={msg.date}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="lg:w-[484px] px-[4px]">
//                   <div className="flex items-start gap-3 py-[12px]">
//                     <Image
//                       src={studentImage.src}
//                       width={40}
//                       height={40}
//                       alt="image"
//                       objectFit="cover"
//                       className="rounded-full"
//                     />
//                     <div>
//                       <h4 className="mb-[4px] text-[#303030] text-[14px] font-[400                          ]">
//                         Zaire Philips
//                       </h4>
//                       <p className="font-[400] text-[12px] text-[#686868] flex items-center gap-[12px]">
//                         All Report: 12 <span className="text-[#FF9500]">Reassigned: 2</span>{' '}
//                         <span className="text-[#34C759]">Reassigned: 10</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div
//                     className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-hide"
//                     style={{ scrollbarWidth: 'none' }}
//                   >
//                     {cards.map((card, index) => (
//                       <MessageCard
//                         key={index}
//                         image={card.image}
//                         title={card.title}
//                         description={card.description}
//                         timestamp={card.timestamp}
//                         onButtonClick={card.onButtonClick}
//                       />
//                     ))}
//                   </div>
//                   <div className="mt-[12px] flex items-end justify-between bg-white rounded border border-[#F1F1F1] ">
//                     <div className=" flex items-center gap-2 rounded-[12px] px-[8px]  w-[90%]">
//                       <div className="p-[1px] rounded-full border outline-none h-[15px] w-[15px] flex items-center justify-center">
//                         <div className="bg-[#FF9500] rounded-full h-[9px] w-[9px]"></div>
//                       </div>
//                       <textarea
//                         className="w-[90%] outline-none"
//                         style={{ scrollbarWidth: 'none' }}
//                       />
//                     </div>
//                     <button className="p-[10px] bg-[#0B7077] text-white roundd-tr rounded-br">
//                       <SendIcon />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </BlurBackground>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-image.png'
import { useState } from 'react'
import NavBar from '../../common/nav-bar'
import BlurBackground from '../../components/Layout/blurBackground'
import Image from 'next/image'
import MessageList from '../../components/Message/messageList'
import MessageCard from '../../components/Message/messageCard'
import SendIcon from '../../assets/icons/send'

export default function Reports() {
  const [active, setActive] = useState<string>('All Report')
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  const messageList = [
    {
      id: '1',
      image: studentImage.src,
      name: 'Zaire Philips',
      message: 'I just subscribed to your profile. Do you wanna do a collab?',
      date: 'March 24',
    },
    {
      id: '2',
      image: studentImage.src,
      name: 'Anna Doe',
      message: 'Can we schedule a meeting for next week?',
      date: 'March 25',
    },
  ]

  const cards = [
    {
      image: studentImage.src,
      title: 'Prepare a Market Analysis Report',
      description:
        'Gain valuable insights into market trends, competitors, and growth opportunities with this analysis report.',
      timestamp: 'Friday 2:20pm',
      onButtonClick: () => alert('Button clicked for Market Analysis Report'),
    },
    {
      image: studentImage.src,
      title: 'Design a New Website Layout',
      description: 'Explore innovative design layouts that enhance user experience and engagement.',
      timestamp: 'Monday 11:00am',
      onButtonClick: () => alert('Button clicked for Website Layout'),
    },
  ]

  const careers = [{ title: 'All Report' }, { title: 'Reassigned' }, { title: 'Approved' }]

  return (
    <div className="pb-[600px]">
      <div className="relative">
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
        <div className="max-w-full lg:w-[866px] mx-auto absolute top-[200px] left-0 right-0 px-4 lg:px-0 w-full">
          <p className="py-[7px] font-[500] text-[20px] text-white text-start">Reports</p>

          <BlurBackground background="bg-[#fafafa]">
            <div className="flex lg:flex-row flex-col ">
              {/* Message List */}
              <div className={`lg:w-[350px] ${selectedMessage ? 'hidden' : 'block'} lg:block`}>
                <div className="flex items-center mb-[28px]">
                  {careers.map((c) => (
                    <button
                      className={`py-[6px] px-[20px] rounded-[32px] font-[400] text-[12px] ${
                        active === c.title ? 'bg-[#0B7077] text-[#FFFFFF]' : ''
                      }`}
                      key={c.title}
                      onClick={() => setActive(c.title)}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
                <div className="w-full max-h-[500px] overflow-y-auto scrollbar-hide">
                  {messageList.map((msg) => (
                    <div key={msg.id} onClick={() => setSelectedMessage(msg.id)}>
                      <MessageList
                        image={msg.image}
                        name={msg.name}
                        message={msg.message}
                        date={msg.date}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Body */}
              <div
                className={`lg:w-[484px] ${selectedMessage ? 'block' : 'hidden'} lg:block px-[4px] `}
              >
                {/* Back Button (Mobile View) */}
                <button
                  className="lg:hidden text-[#0B7077] mb-4"
                  onClick={() => setSelectedMessage(null)}
                >
                  Back to Messages
                </button>

                <div className="flex items-start gap-3 py-[12px]">
                  <Image
                    src={studentImage.src}
                    width={40}
                    height={40}
                    alt="image"
                    objectFit="cover"
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="mb-[4px] text-[#303030] text-[14px] font-[400]">
                      Zaire Philips
                    </h4>
                    <p className="font-[400] text-[12px] text-[#686868]">
                      All Report: 12 <span className="text-[#FF9500]">Reassigned: 2</span>{' '}
                      <span className="text-[#34C759]">Approved: 10</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-hide">
                  {cards.map((card, index) => (
                    <MessageCard
                      key={index}
                      image={card.image}
                      title={card.title}
                      description={card.description}
                      timestamp={card.timestamp}
                      onButtonClick={card.onButtonClick}
                    />
                  ))}
                </div>
                <div className="mt-[12px] flex items-end justify-between bg-white rounded border border-[#F1F1F1]">
                  <div className="flex items-center gap-2 rounded-[12px] px-[8px] w-[90%]">
                    <div className="p-[1px] rounded-full border outline-none h-[15px] w-[15px] flex items-center justify-center">
                      <div className="bg-[#FF9500] rounded-full h-[9px] w-[9px]"></div>
                    </div>
                    <textarea className="w-[90%] outline-none" style={{ scrollbarWidth: 'none' }} />
                  </div>
                  <button className="p-[10px] bg-[#0B7077] text-white rounded-tr rounded-br">
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </BlurBackground>
        </div>
      </div>
    </div>
  )
}
