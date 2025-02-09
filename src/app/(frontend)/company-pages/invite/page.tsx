'use client'
import Image from 'next/image'
import ArrowIcon from '../../assets/icons/arrow'
import NavBar from '../../common/nav-bar'
import studentImage from '../../assets/images/student-img.png'
import MailIcon from '../../assets/icons/mail'
import Calendar from '../../components/Ui/calendar'
import { useRouter } from 'next/navigation'

export default function StudentInvitation() {
  const router = useRouter()


  const dates = [{ label: '07:00 am' }, { label: '08:00 am' }, { label: '09:00 am' }]
  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar fill="#0B7077" />
      </nav>
      <div className=" max-w-[866px] m-auto lg:mt-[58px] ">
        <button
          className="flex items-center gap-[4px] font-[400] text-[14px] p-[24px] lg:p-0"
          onClick={() => router.back()}
        >
          <ArrowIcon />
          Back
        </button>

        <div className="p-[24px] flex items-start flex-col gap-5 lg:flex-row md:flex-row">
          <div className="max-w-[250px]">
            <Image
              src={studentImage}
              alt="image"
              width={0}
              height={300}
              // objectFit={'contain'}
              className="h-[300px] w-full object-cover rounde"
            />
            <button className="mt-[24px] w-full py-[12px] rounded-[6px] bg-[#0B7077] flex items-center justify-center  gap-[8px] font-[500] text-[16px] text-[#FFFFFF] ">
              <MailIcon fill="#FFFFFF" /> Send Invitation
            </button>
          </div>
          <div className="lg:w-[568px] lg:max-w-[cal(full- 250px)] ">
            <div className="w-full">
              <h3 className="font-[400] text-[14px]">Invitation Message</h3>

              <textarea
                name=""
                cols={6}
                placeholder="Write a Message"
                className="bg-white p-[12px] h-[120px] border p-[12px] w-full"
                id=""
              ></textarea>
              <div className="mt-[12px]">
                <Calendar />
              </div>

              <div className="mt-[12px] lg:flex items-start flex-col justify-between gap-3 mb-[100px] w-full">
                <div>
                  <p className="font-[400] text-[14px]">Select Time</p>
                  <div className="mt-[6px] bg-[#FFFFFF] rounded-[4px] p-[6px]">
                    {dates &&
                      dates.map((d) => (
                        <div
                          key={d.label}
                          className="px-[12px] py-[6px] mb-[4px] font-[500] text-[14px] rounded-[4px] lg:w-[246px]"
                          style={{ background: d.label === '09:00 am' ? '#B3FAFF' : '' }}
                        >
                          {' '}
                          {d.label}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="lg:max-w-[246px]">
                  <p className="font-[400]">Invitation Conversation</p>
                  <p className="text-[#FF9500] font-[400] text-[12px] my-[12px]">
                    Confirm your invitation before sending. The recipient will be notified once you
                    proceed.”
                  </p>
                  <button className="py-[12px] w-full flex items-center justify-center text-white  bg-[#0B7077] font-[500] text-[16px] rounded-[8px] ">
                    Send Invitation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
