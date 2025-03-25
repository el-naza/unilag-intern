'use client'

import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-image.png'
import { useEffect, useState } from 'react'
import NavBar from '../../common/nav-bar'
import BlurBackground from '../../components/Layout/blurBackground'
import Image from 'next/image'
import MessageList from '../../components/Message/messageList'
import fetchDocs from '@/services/fetchDocs'
import Select from 'react-select'
import updateDoc from '@/services/updateDoc'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'

export default function Reports() {
  const [active, setActive] = useState<string>('All Report')
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const careers = [{ title: 'All Report' }, { title: 'Reassigned' }, { title: 'Approved' }]

  type Student = {
    id: string
    firstName: string
    lastName: string
    middleName?: string
    matricNo: string
    hasSetPassword: boolean
    image?: { url: string }
  }

  type Report = {
    id: string
    student: Student
    status: string
    remark: string
    details: string
    title: string
    createdAt: string
    updatedAt: string
  }

  // Define the state variables with explicit types
  const [allReports, setAllReports] = useState<Report[]>([])
  const [reportDocs, setReportDocs] = useState<Report[]>([])
  const [uniqueStudents, setUniqueStudents] = useState<Report[]>([])

  const fetchInternReports = async () => {
    const res: any = await fetchDocs('reports')
    console.log('reports', res)

    if (res?.docs) {
      setReportDocs(res.docs)

      const uniqueStudentsMap = new Map<string, Report>()
      res.docs.forEach((report: Report) => {
        uniqueStudentsMap.set(report.student.id, report)
      })

      setUniqueStudents(Array.from(uniqueStudentsMap.values())) 
      console.log(uniqueStudents)
    }
  }

  useEffect(() => {
    fetchInternReports()
  }, [])

  // console.log(reportDocs)
  // console.log(uniqueStudents)

  const [selectedStudent, setSelectedStudent] = useState(null)
  // console.log(selectedStudent)
  // Function to filter reports for the selected student
  const filteredReports = selectedStudent
    ? reportDocs && reportDocs.filter((s) => s?.student?.id === selectedStudent)
    : []


  const [reports, setReports] = useState<Report[]>(filteredReports || [])

  const getCustomStyles = () => ({
    control: (base, state) => ({
      ...base,
      borderRadius: '6px',
      padding: '5px',
      fontSize: '12px',
      fontWeight: '400',
      border: state.isFocused ? '1px solid #ccc' : '1px solid #e0e0e0',
      boxShadow: 'none',
      backgroundColor: '',
      '&:hover': { borderColor: '#ccc' },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#8E8E93',
      fontSize: '12px',
      fontWeight: '400',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#5D737E',
      padding: '5px',
      fontSize: '12px',

      '&:hover': { color: '#3F5C6C' },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    singleValue: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      color: '#000',
      fontSize: '12px',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '6px',
      fontSize: '12px',

      overflow: 'hidden',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      padding: '10px',
      backgroundColor: isSelected ? '#f0f0f0' : '#ffffff',
      color: '#000',
      '&:hover': {
        backgroundColor: '#f8f8f8',
      },
    }),
  })

  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: props.isFocused ? '#f0f0f0' : '#ffffff',
        }}
      >
        <span
          style={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: data.color,
            marginRight: '8px',
          }}
        />
        {data.label}
      </div>
    )
  }

  const approvalStatus = [
    { value: 'approved', label: 'Approved', color: 'green' },
    { value: 'reasign', label: 'Reasign', color: 'blue' },
    // { value: 'pending', label: 'Pending', color: 'yellow' },
  ]

  const remarkOptions = [
    { value: 'excellent', label: 'Excellent', color: 'green' },
    { value: 'good', label: 'Good', color: 'blue' },
    { value: 'fair', label: 'Fair', color: 'yellow' },
    { value: 'need Improvement', label: 'Need Improvement', color: 'yellow' },
    { value: 'poor', label: 'Poor', color: 'yellow' },
    // { value: 'pending', label: 'Pending', color: 'yellow' },
  ]

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: { status?: string; remark?: string }
  }>({})

  // Handle status selection
  const handleStatusChange = (selectedOption: any, id: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: selectedOption.value },
    }))
  }

  // Handle remark selection
  const handleRemarkChange = (selectedOption: any, id: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], remark: selectedOption.value },
    }))
  }

  const updtaeReportMtn = useMutation({
    mutationFn: async ({ id, status, remark }: { id: string; status: string; remark?: string }) => {
      try {
        setLoadingStates((prev) => ({ ...prev, [id]: true }))
        console.log('Sending update request:', id, { status, remark })

        const res = await updateDoc('reports', id, { status, remark })

        if (!res) {
          toast.error('Network error; please try again later')
          return
        }
        toast.success('Report updated')

        console.log('Response:', res)
        return res
      } catch (error) {
        console.error('Error updating application:', error)
        toast.error('An error occurred while updating; please try again later')
      } finally {
        setLoadingStates((prev) => ({ ...prev, [id]: false }))
      }
    },
  })

  const handleRespond = async (id: string) => {
    const { status, remark } = selectedValues[id] || {}
  
    if (!status) {
      setErrors((prev) => ({ ...prev, [id]: 'Approval status is required' }))
      toast.error('Please select an approval status')
      return
    }

    if (!remark) {
      setErrors((prev) => ({ ...prev, [id]: 'Remark is required' }))
      toast.error('Please select a remark')
      return
    }

    setErrors((prev) => ({ ...prev, [id]: '' }))
    await updtaeReportMtn.mutateAsync({ id, status, remark })
  }


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
                  {uniqueStudents.map((r) => (
                    <div key={r.id} onClick={() => setSelectedStudent(r?.student?.id)}>
                      <MessageList
                        image={r?.student?.image?.url || studentImage}
                        name={`${r?.student?.firstName} ${r?.student?.lastName}`}
                        message="View Reports"
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
                      {uniqueStudents.find((s) => s.id === selectedStudent)?.firstName}{' '}
                      {uniqueStudents.find((s) => s.id === selectedStudent)?.lastName}
                    </h4>
                    <p className="font-[400] text-[12px] text-[#686868]">
                      All Report: 12 <span className="text-[#FF9500]">Reassigned: 2</span>{' '}
                      <span className="text-[#34C759]">Approved: 10</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-hide">
                  {filteredReports &&
                    filteredReports.map((card) => (
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="border w-[290px] rounded">
                            {card?.image ? (
                              <Image
                                src={card?.image?.url}
                                alt="image"
                                width={290}
                                height={120}
                                objectFit="cover"
                                className="h-[120px]"
                              />
                            ) : null}

                            <div className="w-full p-[8px]">
                              <h4 className="font-[700] text-[12px] mb-[4px]">{card.title}</h4>
                              <p className="text-[#8E8E93] font-[400] text-[10px]">
                                {card.details}
                              </p>
                              <p className="mt-[6px] text-[#667085] font-[400] text-[12px]">
                                {card.timestamp}
                              </p>
                              <div className="flex flex-col gap-1">
                                <Select
                                  options={approvalStatus}
                                  value={approvalStatus.find(
                                    (option) => option.value === selectedValues[card.id]?.status,
                                  )}
                                  onChange={(selectedOption) =>
                                    handleStatusChange(selectedOption, card.id)
                                  }
                                  placeholder="Select Approval Status"
                                  styles={getCustomStyles()}
                                  components={{ Option: CustomOption }}
                                />
                                {errors[card.id] && errors[card.id].includes('Approval status') && (
                                  <p className="text-red-500 text-xs mt-1">{errors[card.id]}</p>
                                )}

                                {/* Remark Select */}

                                <Select
                                  options={remarkOptions}
                                  value={remarkOptions.find(
                                    (option) => option.value === selectedValues[card.id]?.remark,
                                  )}
                                  onChange={(selectedOption) =>
                                    handleRemarkChange(selectedOption, card.id)
                                  }
                                  placeholder="Select a Remark"
                                  styles={getCustomStyles()}
                                  components={{ Option: CustomOption }}
                                />
                                {errors[card.id] && errors[card.id].includes('Remark') && (
                                  <p className="text-red-500 text-xs mt-1">{errors[card.id]}</p>
                                )}

                                {/* Submit Button */}
                                <Button
                                  className="p-[10px] bg-[#0B7077] text-white rounded w-full mt-3"
                                  onClick={() => handleRespond(card.id)}
                                  disabled={loadingStates[card.id] || false}
                                >
                                  {loadingStates[card.id] ? <Spinner /> : 'Send'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </BlurBackground>
        </div>
      </div>
    </div>
  )
}
