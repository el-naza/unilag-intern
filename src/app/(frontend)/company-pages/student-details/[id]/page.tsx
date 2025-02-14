'use client'
import Image from 'next/image'
import ArrowIcon from '../../../assets/icons/arrow'
import NavBar from '../../../common/nav-bar'
import studentImage from '../../../assets/images/profile-image.webp'
import MailIcon from '../../../assets/icons/mail'
import InputField from '../../../components/Form/inputField'
import PhoneIcon from '../../../assets/icons/phone'
import DownloadIcon from '../../../assets/icons/download'
import ViewIcon from '../../../assets/icons/view'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import fetchDoc from '@/services/fetchDoc'
import Loader from '@/app/(frontend)/components/Layouts/Loader'


export default function StudentDetails() {
  const router = useRouter()
  const fields = [
    { label: 'First Name', key: 'firstName', type: 'text' },
    { label: 'Last Name', key: 'lastName', type: 'text' },
    { label: 'Matric Number', key: 'matricNo', type: 'text' },
    { label: 'Date of Birth', key: 'dob', type: 'text' },
    { label: 'Nationality', key: 'nationality', type: 'text' },
    { label: 'State of Origin', key: 'stateOfOrigin', type: 'text' },
    { label: 'Home Address', key: 'homeAddress', type: 'text' },
    { label: 'Gender', key: 'gender', type: 'text' },
    { label: 'Course', key: 'course', type: 'text' },
    { label: 'Level', key: 'level', type: 'text' },
    { label: 'Internship Type', key: 'internshipType', type: 'text' },
    { label: 'Email', key: 'email', type: 'email' },
  ]

  const academicFields = [
    { label: 'CGPA', placeholder: '3.5', type: 'text' },
    { label: 'Department', placeholder: 'Mathematics', type: 'text' },
  ]

  const { id: studentId }: { id: string } = useParams()
  const [studentDetails, setStudentDetails] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)

  const fetchStudentDetails = async () => {
    const res: any = await fetchDoc('students', studentId)
    setStudentDetails(res)
    setLoading(false)
  }

  useEffect(() => {
    if (studentId) {
      fetchStudentDetails()
    }
  }, [studentId])

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
        {loading ? (
          <Loader />
        ) : (
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
                // onClick={() => router.push('/company-pages/invite')}
                  onClick={() => router.push(`/company-pages/student-details/${studentId}/invite`)}

              >
                <MailIcon
                  fill="#FFFFFF"
                />{' '}
                Send Invitation
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
                      placeholder={studentDetails[field.key] || 'Loading...'}
                      type={field.type}
                      disabled={true}
                    />
                  ))}
                </div>
              </div>
              {/* <div className="mt-[38px] ">
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
              </div> */}
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
        )}
      </div>
    </div>
  )
}
