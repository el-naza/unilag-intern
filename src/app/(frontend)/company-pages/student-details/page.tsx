'use client'
import Image from 'next/image'
import ArrowIcon from '../../assets/icons/arrow'
import NavBar from '../../common/nav-bar'
import studentImage from '../../assets/images/student-img.png'
import MailIcon from '../../assets/icons/mail'
import InputField from '../../components/Form/inputField'
import PhoneIcon from '../../assets/icons/phone'
import DownloadIcon from '../../assets/icons/download'
import ViewIcon from '../../assets/icons/view'
import { useRouter } from 'next/navigation'
export default function StudentDetails() {
  const router = useRouter()
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
      <nav className="w-full bg-[#FAFAFA99] ">
        <NavBar fill="#0B7077" />
      </nav>
      <div className="max-w-[866px] m-auto lg:mt-[58px] pb-[100px] ">
        <button
          className="flex items-center gap-[4px] font-[400] text-[14px] p-[24px] lg:p-0"
          onClick={() => router.back()}
        >
          <ArrowIcon />
          Back
        </button>

        <div className="p-[24px] flex items-start flex-col gap-5 lg:flex-row">
          <div className="max-w-[250px] md:max-w-full ">
            <Image
              src={studentImage}
              alt="image"
              width={0}
              height={300}
              // objectFit={'contain'}
              className="h-[300px] w-full object-cover rounde"
            />
            <button
              className="mt-[24px] w-full py-[12px] rounded-[6px] bg-[#0B7077] flex items-center justify-center  gap-[8px] font-[500] text-[16px] text-[#FFFFFF] "
              onClick={() => router.push('/company-pages/invite')}
            >
              <MailIcon fill="#FFFFFF" /> Send Invitation
            </button>
          </div>
          <div className="lg:w-[568px] w-full">
            <div>
              <h3 className="font-[400] text-[16px]">Basic Information</h3>
              <p className="text-[#8E8E93] font-[400] text-[12px]">Students Basic Informations</p>
              <div className="mt-[22px] grid md:grid-cols-2 gap-[14px] md:grid-cols-2">
                {fields.map((field, index) => (
                  <InputField
                    key={index}
                    label={field.label}
                    placeholder={field.placeholder}
                    Icon={field.Icon}
                    type={field.type}
                    disabled={true}
                  />
                ))}
              </div>
            </div>
            <div className="mt-[38px] ">
              <h3 className="font-[400] text-[16px]">Academic Information</h3>
              <p className="text-[#8E8E93] font-[400] text-[12px]">
                Students Academic Informations
              </p>
              <div className="mt-[22px] grid grid-cols-2 gap-[14px] ">
                {academicFields.map((field, index) => (
                  <InputField
                    key={index}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    disabled={true}
                  />
                ))}
              </div>
            </div>
            <div className="mt-[38px] ">
              <h3 className="font-[400] text-[16px]">Siwes Form</h3>
              <p className="text-[#8E8E93] font-[400] text-[12px]">Uploaded Student Siwes Form</p>
              <div className="mt-[22px] grid grid-cols-2 gap-[14px] ">
                <div className="max-w-[297px] ">
                  {/* Title */}
                  <div className="py-2 text-[#000] font-[500] text-[14px] border-b text-[#48484A]">
                    Form (1)
                  </div>

                  {/* Document Preview */}
                  <div className="relative h-[180px] overflow-hidden">
                    {/* Document Image */}
                    <Image
                      src={studentImage}
                      alt="Document Preview"
                      className="object-cover w-full h-full"
                    />

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full flex justify-end items-start p-2 space-x-2">
                      <button
                        className="bg-[#DCF4FF] flex items-center justify-center text-[#DCF4FF] hover:bg-[#DCF4FF] hover:text-white transition h-[24px] w-[24px]"
                        aria-label="View Document"
                      >
                        <ViewIcon />
                      </button>

                      <button className="bg-[#DCF4FF] flex items-center justify-center text-[#DCF4FF] hover:bg-[#DCF4FF] hover:text-white transition h-[24px] w-[24px]">
                        <DownloadIcon />
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#007BFF] text-white px-[8px] py-[4px] flex justify-between items-center">
                    <span className="font-[500] text-[12px]">Form001</span>
                    <span className="font-[500] text-[12px]">(2)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
