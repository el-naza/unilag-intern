'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import profileLogo from '../../assets/images/compay-profile-logo.png'
import { useEffect, useMemo, useState } from 'react'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import Image from 'next/image'
import InputField from '../../components/Form/inputField'
import PhoneIcon from '../../assets/icons/phone'
import MailIcon from '../../assets/icons/mail'
import LocationIcon from '../../assets/icons/location'
import LinkIcon from '../../assets/icons/link'
import { useSession } from 'next-auth/react'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import { useMutation } from '@tanstack/react-query'
import updateDoc from '@/services/updateDoc'
import { toast } from 'sonner'

export default function CompanyProfile() {
  const { data: session } = useSession()

  const user = useMemo<any>(() => session?.user, [session])

  const fields = [
    { label: 'Company Name', placeholder: user?.name || 'Company Name', type: 'text' },
    { label: 'CAC Number', placeholder: user?.cac || 'CAC Number', type: 'text' },
    {
      label: 'Location',
      placeholder: user?.address || 'Location',
      type: 'text',
      Icon: LocationIcon,
      fill: '#0B7077',
    },
    { label: 'Email', placeholder: user?.email || 'Email', Icon: MailIcon, type: 'email' },
    { label: 'Phone', placeholder: user?.phone || 'Phone', Icon: PhoneIcon, type: 'text' },
    { label: 'Website', placeholder: user?.website || 'Website', Icon: LinkIcon, type: 'text' },
  ]

  const [loading, setLoading] = useState<boolean>(true)
  const [students, setStudents] = useState<any>([])

  const findStudent = async () => {
    const res: any = await fetchDocs('employments')
    console.log(res)
    setStudents(res?.docs)
    setLoading(false)
  }

  useEffect(() => {
    findStudent()
  }, [])

  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    cac: user?.cac || '',
    address: user?.address || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
  })

  const updateCompanyProfileMtn = useMutation<
    unknown,
    Error,
    { id: string; data: typeof formData }
  >({
    mutationFn: async ({ id, data }) => {
      try {
        console.log('Updating company:', { id, data })

        const res = await updateDoc('companies', id, data)

        console.log('Response:', res)
        if (!res) return toast.error('Network error; please try again later')

        return res
      } catch (error) {
        toast.error('An error occurred while updating; please try again later')
        throw error
      }
    },
  })

  const handleRespond = async () => {
    if (!user?.id) {
      return toast.error('User ID is missing')
    }

    try {
      await updateCompanyProfileMtn.mutateAsync({ id: user.id, data: formData })

      setShowModal(false)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div
        className="relative"
        style={{
          backgroundImage: `url(${hero.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
          paddingBottom: '',
        }}
      >
        <nav className="text-[#FFFFFF]">
          <NavBar />
        </nav>

        <div className="mt-[75px] pb-[34px] lg:pb-[0] max-w-full md:max-w-[866px] m-auto flex justify-between items-center ">
          <div className=" flex lg:flex-row flex-col items-center gap-[12px] px-4">
            <Image
              alt="image"
              src={user?.logo || profileLogo.src}
              height="150"
              width="150"
              objectFit="cover"
              className="rounded-full border-2 border-[#418A7E]"
            />
            <h2 className="text-white font-[700] text-[30px]">{user?.name}</h2>
          </div>
          {/* <button className='bg-white h-[33px] w-[89px] text-black font-[500] text-[12px] rounded '>Edit profile</button> */}
          <button
            className="bg-white h-[33px] w-[89px] text-black font-[500] text-[12px] rounded"
            onClick={() => (isEditing ? setShowModal(true) : setIsEditing(true))}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="max-w-full md:max-w-[866px] m-auto px-4 pb-[100px]">
        {/* <p className="pt-[18px] font-[400] text-[16 px]">Student List</p>
        <p className="mt-[2px] text-[#8E8E93] font-[400] text-[12px]">
          Students Basic Informations
        </p> */}
        <div className="mt-[22px] grid md:grid-cols-3 gap-[14px] md:grid-cols-2">
          {fields.map((field, index) => (
            <InputField
              key={index}
              label={field.label}
              placeholder={field.placeholder}
              Icon={field.Icon}
              type={field.type}
              disabled={!isEditing}
            />
          ))}
        </div>

        <div>
          <p className="font-[400] text-[#48484A] text-[14px] my-[8px]">Description</p>
          <div className="p-[12px] w-full bg-white">
            <p className="text-[#48484A] font-[400] text-[14px]">
              CMR Shopping Mall is a premier retail and lifestyle destination that redefines the
              shopping and entertainment experience. Located at the heart of , CMR is designed to
              cater to diverse needs, offering a vibrant mix of retail, dining, entertainment, and
              leisure all under one roof.
            </p>
          </div>
        </div>
        <div className="mt-[38px] mb-[18px]">
          <h3 className="font-[400] text-[16px]">All Interns </h3>
          <p className="text-[#8E8E93] font-[400] text-[12px]">List of all active interns</p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loader height="auto" background="transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] py-[12px]">
            {students &&
              students.map((student, index) => (
                <StudentProfileCard
                  key={index}
                  student={{
                    firstName: student.student.firstName,
                    lastName: student.student.lastName,
                    course: student.student.course,
                  }}
                />
              ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold mb-4">Confirm Update?</p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleRespond}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
