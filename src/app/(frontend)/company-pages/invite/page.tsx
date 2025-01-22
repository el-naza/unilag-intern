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

  const academicFields = [
    { label: 'CGPA', placeholder: '3.5', type: 'text' },
    { label: 'Department', placeholder: 'Mathematics', type: 'text' },
  ]
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
                cols={4}
                placeholder="Write a Message"
                className="bg-white p-[12px] border p-[12px] w-full"
                id=""
              ></textarea>
              <div className="mt-[12px]">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
