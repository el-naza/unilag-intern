import Image from 'next/image'
import ArrowIcon from '../../assets/icons/arrow'
import NavBar from '../../common/nav-bar'
import studentImage from '../../assets/images/student-img.png'
import MailIcon from '../../assets/icons/mail'
import InputField from '../../components/Form/inputField'
import PhoneIcon from '../../assets/icons/phone'
import DownloadIcon from '../../assets/icons/download'
import ViewIcon from '../../assets/icons/view'
import Calendar from '../../components/Ui/calendar'
export default function StudentInvitation() {
  const fields = [
    { label: 'First Name', placeholder: 'Precious', type: 'text' },
    { label: 'Last Name', placeholder: 'Enter your password', type: 'text' },
    { label: 'Email', placeholder: 'Example@gmail.com', Icon: MailIcon, type: 'email' },
    { label: 'Phone', placeholder: '09072709030', Icon: PhoneIcon, type: 'number' },
  ]

  const dates = [{ label: '07:00 am' }, { label: '08:00 am' }, { label: '09:00 am' }]
  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar />
      </nav>
      <div className="max-w-[866px] m-auto mt-[58px]">
        <button className="flex items-center gap-[4px] font-[400] text-[14px]">
          <ArrowIcon />
          Back
        </button>

        <div className="p-[12px] flex items-start gap-5">
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
          <div className="w-[568px]">
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

              <div className="mt-[12px] flex items-start justify-between">
                <div>
                  <p className="font-[400] text-[14px]">Select Time</p>
                  <div className="mt-[6px] bg-[#FFFFFF] rounded-[4px] p-[6px]">
                    {dates &&
                      dates.map((d) => (
                        <div
                          className="px-[12px] py-[6px] mb-[4px] font-[500] text-[14px] rounded-[4px] w-[246px]"
                          style={{ background: d.label === '09:00 am' ? '#B3FAFF' : '' }}
                        >
                          {' '}
                          {d.label}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="max-w-[246px]">
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
