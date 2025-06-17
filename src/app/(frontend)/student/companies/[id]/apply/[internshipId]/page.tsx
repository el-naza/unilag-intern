'use client'

import RedCancelIcon from '@/app/(frontend)/assets/icons/redcancel'
import TaskCheck from '@/app/(frontend)/assets/icons/taskcheck'
import advertText from '@/app/(frontend)/assets/images/adverts.png'
import Loader from '@/app/(frontend)/components/Layouts/Loader'
import { InternshipApplications } from '@/collections/InternshipApplications'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { InternshipApplication, Student } from '@/payload-types'
import fetchDoc from '@/services/fetchDoc'
import fetchDocs from '@/services/fetchDocs'
import fetchMe from '@/services/fetchMe'
import saveDoc from '@/services/saveDoc'
import saveFormDataDoc from '@/services/saveFormDataDoc'
import { altFormatDate } from '@/utilities/formatDate'
import { ValidationErrors } from '@/utilities/types'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Field, ValidationFieldError } from 'payload'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import companyLogo from '@/app/(frontend)/assets/images/company-logo.svg'

const Page = () => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => (await fetchMe('students'))?.user as Student | undefined,
  })
  const user = useMemo<any>(() => meQuery.data, [meQuery.data])

  const { id: companyId }: { id: string } = useParams()
  const { internshipId }: { internshipId: string } = useParams()
  const router = useRouter()
  const [company, setCompany] = useState<any>({})
  const [internship, setInternship] = useState<any>({})
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  const attachmentRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState([])

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    setFiles([...files, ...selectedFiles])
    console.log(files)
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const fetchCompany = async () => {
    const res: any = await fetchDoc('companies', companyId)
    setCompany(res)
    await fetchInternship()
    setLoading(false)
  }

  const fetchInternship = async () => {
    const res: any = await fetchDoc('internships', internshipId)
    setInternship(res ? res : {})
  }

  const submitApplicationMtn = useMutation({
    mutationFn: async (internshipApplication: InternshipApplication) => {
      try {
        const res = await saveDoc('internship-applications', {
          letter: internshipApplication.letter,
          student: internshipApplication.student,
          company: internshipApplication.company,
          internship: internshipApplication.internship,
        })
        console.log('res', res)
        if (!res) return toast.error('Network err; pls try again later')
        if (res.status && (res.status < 200 || res.status > 299))
          return toast.error('An error occured; pls try again later')
        return res
      } catch (err) {
        toast.error('An error occured while submitting your application; pls try again later')
        return err.message || ''
      }
    },
  })

  const form = useForm<InternshipApplication>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        value.company = companyId
        value.internship = internshipId
        value.student = user?.id

        const emptyRequiredFields = InternshipApplications.fields.reduce<object>(
          (acc: ValidationFieldError, field: Field & { required: boolean; name: string }) => ({
            ...acc,
            ...(field?.required && !value[field.name] && { [field.name]: 'Required' }),
          }),
          {},
        )

        if (Object.keys(emptyRequiredFields).length) {
          return {
            form: 'Some required fields are missing. Please fill out all mandatory fields to proceed.',
            fields: emptyRequiredFields,
          }
        }

        const res = await submitApplicationMtn.mutateAsync(value)
        if ((res as ValidationErrors)?.errors?.[0]?.data?.errors?.length) {
          return {
            form: (res as ValidationErrors).errors[0].message,
            fields: (res as ValidationErrors).errors[0].data.errors.reduce<object>(
              (acc: ValidationFieldError, err) => ({
                ...acc,
                [err.path]: err.message,
              }),
              {},
            ),
          }
        }

        if (typeof res === 'string' || typeof res === 'number') {
          return {
            form: 'An error occurred while submitting your application.',
          }
        }

        form.reset()
        toast.success('Application successful')
        setOpen(true)

        return null
      },
    },
  })

  const goHome = () => {
    setOpen(false)
    router.push('/student')
  }

  useEffect(() => {
    fetchCompany()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-black bg-white lg:bg-[#195F7E] py-0">
          <div className="container">
            <main className="py-1 lg:bg-[#195F7E] lg:py-20">
              <Link className="hidden lg:block" href={'/student'}>
                <div className="text-white flex gap-1 mb-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6668 9.16634H6.52516L11.1835 4.50801L10.0002 3.33301L3.3335 9.99967L10.0002 16.6663L11.1752 15.4913L6.52516 10.833H16.6668V9.16634Z"
                      fill="white"
                    />
                  </svg>
                  <span>Back</span>
                </div>
              </Link>
              <div className="bg-white lg:rounded-xl">
                <Image
                  height={100}
                  width={100}
                  className="hidden lg:block w-full mb-3 lg:rounded-xl"
                  src="/company-banner.png"
                  alt="company-banner"
                />
                <div className="grid lg:grid-cols-4">
                  <div className="hidden lg:block rounded-lg bg-[#EBE7E77A] flex p-5">
                    {/*<Image className="m-auto" src={advertText} alt="advert-text" />*/}
                  </div>
                  <div className="lg:col-span-2 p-4">
                    <h5 className="text-black my-3 font-bold">Apply Now</h5>
                    <div className="grid grid-cols-8 mb-3 gap-2">
                      <div className="flex items-center">
                        <Image
                          width={40}
                          height={40}
                          src={company.image ? company?.image?.url : companyLogo}
                          alt="company-logo"
                        />
                      </div>
                      <div className="col-span-7">
                        <h5 className="text-black font-bold uppercase">{company?.name}</h5>
                        <span className="text-[#8E8E93] text-xs">{company?.cac}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                      <div className="grid grid-rows-1 gap-1">
                        <svg
                          width="12"
                          height="15"
                          viewBox="0 0 12 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.6667 2.31331H10V0.97998H8.66667V2.31331H3.33333V0.97998H2V2.31331H1.33333C0.593333 2.31331 0.00666666 2.91331 0.00666666 3.64665L0 12.98C0 13.7133 0.593333 14.3133 1.33333 14.3133H10.6667C11.4 14.3133 12 13.7133 12 12.98V3.64665C12 2.91331 11.4 2.31331 10.6667 2.31331ZM10.6667 12.98H1.33333V6.31331H10.6667V12.98ZM10.6667 4.97998H1.33333V3.64665H10.6667V4.97998ZM4 8.97998H2.66667V7.64665H4V8.97998ZM6.66667 8.97998H5.33333V7.64665H6.66667V8.97998ZM9.33333 8.97998H8V7.64665H9.33333V8.97998ZM4 11.6466H2.66667V10.3133H4V11.6466ZM6.66667 11.6466H5.33333V10.3133H6.66667V11.6466ZM9.33333 11.6466H8V10.3133H9.33333V11.6466Z"
                            fill="#0B7077"
                          />
                        </svg>
                        <div className="text-[#0B7077]">Acceptance Period</div>
                        <div className="text-[#48484A]">
                          {altFormatDate(internship.startDate)} -{' '}
                          {altFormatDate(internship.endDate)}
                        </div>
                      </div>
                      <div className="grid grid-rows-1 gap-1">
                        <svg
                          width="10"
                          height="15"
                          viewBox="0 0 10 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00065 0.97998C2.42065 0.97998 0.333984 3.06665 0.333984 5.64665C0.333984 9.14665 5.00065 14.3133 5.00065 14.3133C5.00065 14.3133 9.66732 9.14665 9.66732 5.64665C9.66732 3.06665 7.58065 0.97998 5.00065 0.97998ZM1.66732 5.64665C1.66732 3.80665 3.16065 2.31331 5.00065 2.31331C6.84065 2.31331 8.33398 3.80665 8.33398 5.64665C8.33398 7.56665 6.41398 10.44 5.00065 12.2333C3.61398 10.4533 1.66732 7.54665 1.66732 5.64665Z"
                            fill="#0B7077"
                          />
                          <path
                            d="M5.00065 7.31331C5.92113 7.31331 6.66732 6.56712 6.66732 5.64665C6.66732 4.72617 5.92113 3.97998 5.00065 3.97998C4.08018 3.97998 3.33398 4.72617 3.33398 5.64665C3.33398 6.56712 4.08018 7.31331 5.00065 7.31331Z"
                            fill="#0B7077"
                          />
                        </svg>
                        <div className="text-[#0B7077]">Location</div>
                        <div className="text-[#48484A]">{company.address}</div>
                      </div>
                      <div className="grid grid-rows-1 gap-1">
                        <svg
                          width="16"
                          height="11"
                          viewBox="0 0 16 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99935 0.646484L0.666016 4.64648L3.33268 6.09982V10.0998L7.99935 12.6465L12.666 10.0998V6.09982L13.9993 5.37315V9.97982H15.3327V4.64648L7.99935 0.646484ZM12.546 4.64648L7.99935 7.12648L3.45268 4.64648L7.99935 2.16648L12.546 4.64648ZM11.3327 9.30648L7.99935 11.1265L4.66602 9.30648V6.82648L7.99935 8.64648L11.3327 6.82648V9.30648Z"
                            fill="#0B7077"
                          />
                        </svg>
                        <div className="text-[#0B7077]">Career Area</div>
                        <div className="text-[#48484A]">
                          {internship.courseArea ? internship.courseArea.join(', ') : ''}
                        </div>
                      </div>
                      <div className="grid grid-rows-1 gap-1">
                        <svg
                          width="16"
                          height="11"
                          viewBox="0 0 16 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.1127 6.39966C12.026 7.01966 12.666 7.85966 12.666 8.97966V10.9797H15.3327V8.97966C15.3327 7.52632 12.9527 6.66632 11.1127 6.39966Z"
                            fill="#0B7077"
                          />
                          <path
                            d="M9.99935 5.64632C11.4727 5.64632 12.666 4.45299 12.666 2.97966C12.666 1.50632 11.4727 0.312988 9.99935 0.312988C9.68602 0.312988 9.39268 0.379655 9.11268 0.472988C9.66602 1.15965 9.99935 2.03299 9.99935 2.97966C9.99935 3.92632 9.66602 4.79966 9.11268 5.48632C9.39268 5.57966 9.68602 5.64632 9.99935 5.64632Z"
                            fill="#0B7077"
                          />
                          <path
                            d="M5.99935 5.64632C7.47268 5.64632 8.66602 4.45299 8.66602 2.97966C8.66602 1.50632 7.47268 0.312988 5.99935 0.312988C4.52602 0.312988 3.33268 1.50632 3.33268 2.97966C3.33268 4.45299 4.52602 5.64632 5.99935 5.64632ZM5.99935 1.64632C6.73268 1.64632 7.33268 2.24632 7.33268 2.97966C7.33268 3.71299 6.73268 4.31299 5.99935 4.31299C5.26602 4.31299 4.66602 3.71299 4.66602 2.97966C4.66602 2.24632 5.26602 1.64632 5.99935 1.64632Z"
                            fill="#0B7077"
                          />
                          <path
                            d="M5.99935 6.31299C4.21935 6.31299 0.666016 7.20632 0.666016 8.97966V10.9797H11.3327V8.97966C11.3327 7.20632 7.77935 6.31299 5.99935 6.31299ZM9.99935 9.64632H1.99935V8.98632C2.13268 8.50632 4.19935 7.64632 5.99935 7.64632C7.79935 7.64632 9.86602 8.50632 9.99935 8.97966V9.64632Z"
                            fill="#0B7077"
                          />
                        </svg>
                        <div className="text-[#0B7077]">Total Applications</div>
                        <div className="text-[#48484A]">{company.internshipApplicationCount}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-black mb-3 font-bold text-xs">Job description</h5>
                      <div className="text-[#8E8E93] text-xs">{internship.jobDescription}</div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                      }}
                    >
                      <div className="mt-5 mb-3">
                        <h5 className="text-black">Write Your Application</h5>
                        <p className="text-[#8E8E93] mb-3">
                          Lets us know why you would be a good fit for our company
                        </p>
                        <form.Field
                          name="letter"
                          children={(field) => {
                            return (
                              <>
                                <textarea
                                  value={field.state.value || ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="w-full placeholder:text-[#ECECEC] p-2 border border-[#F1F1F1] rounded mb-2"
                                  rows={5}
                                  placeholder="Write application..."
                                ></textarea>
                                <FieldError field={field} />
                              </>
                            )
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <h5 className="text-black mb-2">Add Attachments</h5>
                        <div className="w-full p-4 border-dashed border-2 border-[#195F7E] rounded mb-2">
                          <div className="text-center">
                            <div className="flex">
                              <svg
                                className="mx-auto mb-3"
                                width="42"
                                height="43"
                                viewBox="0 0 42 43"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_974_9650)">
                                  <path
                                    d="M33.4412 3.76709H14.1738V11.7571H37.5563V7.88051C37.5563 5.61215 35.7102 3.76709 33.4412 3.76709Z"
                                    fill="#CED9F9"
                                  />
                                  <path
                                    d="M22.5352 12.9867H0V5.57285C0 2.8562 2.21068 0.646484 4.92828 0.646484H12.1336C12.8497 0.646484 13.5396 0.797409 14.1664 1.08099C15.0418 1.47545 15.7939 2.12561 16.3213 2.97508L22.5352 12.9867Z"
                                    fill="#1640C1"
                                  />
                                  <path
                                    d="M42 14.6464V38.5277C42 40.799 40.1511 42.6463 37.8789 42.6463H4.12111C1.84891 42.6463 0 40.799 0 38.5277V10.5269H37.8789C40.1511 10.5269 42 12.3748 42 14.6464Z"
                                    fill="#2354E6"
                                  />
                                  <path
                                    d="M42 14.6464V38.5277C42 40.799 40.1511 42.6463 37.8789 42.6463H21V10.5269H37.8789C40.1511 10.5269 42 12.3748 42 14.6464Z"
                                    fill="#1849D6"
                                  />
                                  <path
                                    d="M32.0471 26.5865C32.0471 32.6789 27.0909 37.6354 20.9991 37.6354C14.9073 37.6354 9.95117 32.6789 9.95117 26.5865C9.95117 20.4951 14.9073 15.5386 20.9991 15.5386C27.0909 15.5386 32.0471 20.4951 32.0471 26.5865Z"
                                    fill="#E7ECFC"
                                  />
                                  <path
                                    d="M32.0479 26.5865C32.0479 32.6789 27.0918 37.6354 21 37.6354V15.5386C27.0918 15.5386 32.0479 20.4951 32.0479 26.5865Z"
                                    fill="#CED9F9"
                                  />
                                  <path
                                    d="M24.5612 26.7218C24.3308 26.9169 24.0485 27.0121 23.7688 27.0121C23.4185 27.0121 23.0705 26.8637 22.827 26.5747L22.2307 25.8678V30.4959C22.2307 31.1752 21.6795 31.7263 21.0002 31.7263C20.3209 31.7263 19.7698 31.1752 19.7698 30.4959V25.8678L19.1734 26.5747C18.7344 27.0941 17.9587 27.1605 17.4392 26.7218C16.9201 26.2838 16.8535 25.5077 17.2915 24.9882L19.7271 22.1008C20.0447 21.7253 20.508 21.5093 21.0002 21.5093C21.4924 21.5093 21.9558 21.7253 22.2733 22.1008L24.7089 24.9882C25.147 25.5077 25.0803 26.2838 24.5612 26.7218Z"
                                    fill="#6C8DEF"
                                  />
                                  <path
                                    d="M24.561 26.7218C24.3306 26.9169 24.0483 27.0121 23.7686 27.0121C23.4183 27.0121 23.0703 26.8637 22.8268 26.5747L22.2305 25.8678V30.4959C22.2305 31.1752 21.6793 31.7263 21 31.7263V21.5093C21.4922 21.5093 21.9555 21.7253 22.2731 22.1008L24.7087 24.9882C25.1467 25.5077 25.0801 26.2838 24.561 26.7218Z"
                                    fill="#3B67E9"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_974_9650">
                                    <rect
                                      width="42"
                                      height="42"
                                      fill="white"
                                      transform="translate(0 0.646484)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="mb-2">Drag your file(s) to start uploading</div>
                            <div className="text-[#8E8E93] mb-2">OR</div>
                            <div>
                              <button
                                type="button"
                                onClick={() => attachmentRef.current?.click()}
                                className="p-2 bg-white text-[#195F7E] border border-[#195F7E] font-bold rounded-md"
                              >
                                Browse files
                              </button>
                            </div>
                            <input
                              className="hidden"
                              ref={attachmentRef}
                              type="file"
                              name="attachment"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <div className="text-[#8E8E93] text-xs">
                          Only support .jpg, .png and .svg and zip files (2mb below)
                        </div>

                        <div className="mt-4">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-3 mb-2 p-2 border rounded"
                            >
                              {file.type.startsWith('image/') ? (
                                <div className="flex items-center gap-2 ">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <p className="font-[400] text-[12px] text-[black]">{file.name}</p>
                                  <p className="font-[400] text-[12px] text-[#8E8E93]">
                                    {file.size > 1024 * 1024
                                      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                                      : (file.size / 1024).toFixed(2) + ' KB'}
                                  </p>
                                </div>
                              ) : file.type === 'application/pdf' ? (
                                <div className="flex items-center gap-2">
                                  {/* <span className="text-red-500">📄 PDF</span> */}
                                  <svg
                                    className="mx-auto "
                                    width="24"
                                    height="24"
                                    viewBox="0 0 42 43"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_974_9650)">
                                      <path
                                        d="M33.4412 3.76709H14.1738V11.7571H37.5563V7.88051C37.5563 5.61215 35.7102 3.76709 33.4412 3.76709Z"
                                        fill="#CED9F9"
                                      />
                                      <path
                                        d="M22.5352 12.9867H0V5.57285C0 2.8562 2.21068 0.646484 4.92828 0.646484H12.1336C12.8497 0.646484 13.5396 0.797409 14.1664 1.08099C15.0418 1.47545 15.7939 2.12561 16.3213 2.97508L22.5352 12.9867Z"
                                        fill="#1640C1"
                                      />
                                      <path
                                        d="M42 14.6464V38.5277C42 40.799 40.1511 42.6463 37.8789 42.6463H4.12111C1.84891 42.6463 0 40.799 0 38.5277V10.5269H37.8789C40.1511 10.5269 42 12.3748 42 14.6464Z"
                                        fill="#2354E6"
                                      />
                                      <path
                                        d="M42 14.6464V38.5277C42 40.799 40.1511 42.6463 37.8789 42.6463H21V10.5269H37.8789C40.1511 10.5269 42 12.3748 42 14.6464Z"
                                        fill="#1849D6"
                                      />
                                      <path
                                        d="M32.0471 26.5865C32.0471 32.6789 27.0909 37.6354 20.9991 37.6354C14.9073 37.6354 9.95117 32.6789 9.95117 26.5865C9.95117 20.4951 14.9073 15.5386 20.9991 15.5386C27.0909 15.5386 32.0471 20.4951 32.0471 26.5865Z"
                                        fill="#E7ECFC"
                                      />
                                      <path
                                        d="M32.0479 26.5865C32.0479 32.6789 27.0918 37.6354 21 37.6354V15.5386C27.0918 15.5386 32.0479 20.4951 32.0479 26.5865Z"
                                        fill="#CED9F9"
                                      />
                                      <path
                                        d="M24.5612 26.7218C24.3308 26.9169 24.0485 27.0121 23.7688 27.0121C23.4185 27.0121 23.0705 26.8637 22.827 26.5747L22.2307 25.8678V30.4959C22.2307 31.1752 21.6795 31.7263 21.0002 31.7263C20.3209 31.7263 19.7698 31.1752 19.7698 30.4959V25.8678L19.1734 26.5747C18.7344 27.0941 17.9587 27.1605 17.4392 26.7218C16.9201 26.2838 16.8535 25.5077 17.2915 24.9882L19.7271 22.1008C20.0447 21.7253 20.508 21.5093 21.0002 21.5093C21.4924 21.5093 21.9558 21.7253 22.2733 22.1008L24.7089 24.9882C25.147 25.5077 25.0803 26.2838 24.5612 26.7218Z"
                                        fill="#6C8DEF"
                                      />
                                      <path
                                        d="M24.561 26.7218C24.3306 26.9169 24.0483 27.0121 23.7686 27.0121C23.4183 27.0121 23.0703 26.8637 22.8268 26.5747L22.2305 25.8678V30.4959C22.2305 31.1752 21.6793 31.7263 21 31.7263V21.5093C21.4922 21.5093 21.9555 21.7253 22.2731 22.1008L24.7087 24.9882C25.1467 25.5077 25.0801 26.2838 24.561 26.7218Z"
                                        fill="#3B67E9"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_974_9650">
                                        <rect
                                          width="42"
                                          height="42"
                                          fill="white"
                                          transform="translate(0 0.646484)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p className="font-[400] text-[12px] text-[black] truncate w-full overflow-hidden whitespace-nowrap max-w-[100px]">
                                    {file.name}
                                  </p>

                                  <p className="font-[400] text-[12px] text-[#8E8E93] whitespace-nowrap">
                                    {file.size > 1024 * 1024
                                      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                                      : (file.size / 1024).toFixed(2) + ' KB'}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">📂 File</span>
                                  <p className="font-[400] text-[12px] text-[black] truncate w-full overflow-hidden whitespace-nowrap max-w-[100px]">
                                    {file.name}
                                  </p>

                                  <p className="font-[400] text-[12px] text-[#8E8E93] whitespace-nowrap">
                                    {file.size > 1024 * 1024
                                      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                                      : (file.size / 1024).toFixed(2) + ' KB'}
                                  </p>
                                </div>
                              )}

                              <button
                                onClick={() => removeFile(index)}
                                // className="h-[25px] w-[25px] rounded-full text-white  border border-2 border-[#FF3636] text-center"
                              >
                                <RedCancelIcon />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <Dialog open={open} onOpenChange={setOpen}>
                          <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                          >
                            {([canSubmit, isSubmitting]) => (
                              <>
                                <Button
                                  type="submit"
                                  disabled={!canSubmit}
                                  size="lg"
                                  className="w-full rounded p-3 bg-[#0B7077] text-white text-center"
                                >
                                  Send Application {isSubmitting && <Spinner />}
                                </Button>
                                <FormError form={form} />
                              </>
                            )}
                          </form.Subscribe>
                          <DialogContent className="bg-white rounded-lg">
                            <DialogTitle className="hidden"></DialogTitle>
                            <DialogDescription className="hidden"></DialogDescription>
                            <div className="grid gap-4 py-4 text-center">
                              <TaskCheck />
                              <h5 className="text-[#0B7077] font-bold">Application Sent</h5>
                              <p className="text-[#8E8E93] text-sm">
                                Your Application has been sent successfully
                              </p>
                            </div>
                            <DialogFooter>
                              <button
                                onClick={goHome}
                                className="w-full rounded p-2 text-xs bg-[#0B7077] text-white text-center"
                              >
                                Continue
                              </button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </form>
                  </div>
                  <div className="hidden lg:block rounded-lg bg-[#EBE7E77A] flex p-5">
                    {/*<Image className="m-auto" src={advertText} alt="advert-text" />*/}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
