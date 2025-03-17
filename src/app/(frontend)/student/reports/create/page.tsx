'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ReportDailyCard from '../../../components/Cards/ReportDailyCard'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../../components/Layouts/Loader'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import saveDoc from '@/services/saveDoc'
import { toast } from 'sonner'
import { useForm } from '@tanstack/react-form'
import { Reports } from '@/collections/Reports'
import { Field, ValidationFieldError } from 'payload'
import { ValidationErrors } from '@/utilities/types'
import { Report } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'
import FormError from '@/components/FormError'
import FieldError from '@/components/FieldError'

const Page = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(true)
  const [employments, setEmployments] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])

  const user = useMemo<any>(() => session?.user, [session])

  const employment = useMemo<any>(() => (employments.length ? employments[0] : {}), [employments])

  const fetchEmployments = async () => {
    const res: any = await fetchDocs('employments')
    console.log(res)
    setEmployments(res.docs)
    await fetchReports()
    setLoading(false)
  }

  const fetchReports = async () => {
    const res: any = await fetchDocs('reports')
    console.log(res)
    setReports(res.docs)
  }

  const submitReportMtn = useMutation({
    mutationFn: async (report: Report) => {
      try {
        const res = await saveDoc('reports', {
          student: report.student,
          employment: report.employment,
          title: report.title,
          details: report.details,
        })
        console.log('res', res)
        if (!res) return toast.error('Network err; pls try again later')
        await fetchReports()
        return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
      }
    },
  })

  const form = useForm<Report>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        value.employment = employment.id
        value.student = user?.id

        const emptyRequiredFields = Reports.fields.reduce<object>(
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

        const res = await submitReportMtn.mutateAsync(value)
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

        form.reset()
        toast.success('Application successful')

        return null
      },
    },
  })

  useEffect(() => {
    fetchEmployments()
  }, [user])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen relative text-sm text-black py-0 lg:py-20">
          <div className="z-10 fixed rounded-b-lg bg-[#0B7077] h-[50%] w-full top-0 hidden lg:block"></div>
          <div className="container z-20 relative">
            <Link className="lg:block hidden" href={'/student'}>
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
            <main className="py-1 bg-white lg:py-20 lg:px-32">
              <div>
                <div className="flex justify-between mt-3 mb-6">
                  <div>
                    <h5 className="text-black font-bold lg:font-medium lg:text-2xl">
                      Daily Report
                    </h5>
                  </div>
                  <div className="flex">
                    <Link className="lg:hidden" href="/student/reports">
                      <span className="text-[#0B7077]">Records (0)</span>
                    </Link>
                    {/* <span className="hidden lg:block text-sm my-auto">17 Thurs - 5:03pm</span> */}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="">
                    <h5 className="text-black mb-2">Report Image</h5>
                    <div className="mb-3">
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
                            <button className="p-2 bg-white text-[#195F7E] border border-[#195F7E] font-bold rounded-md">
                              Browse files
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-[#8E8E93] text-xs">
                        Only support .jpg, .png and .svg and zip files (2mb below)
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      form.handleSubmit()
                    }}
                  >
                    <div className="lg:my-10 grid lg:gap-6">
                      <div className="">
                        <h5 className="text-black mb-2 lg:hidden">Report Title</h5>
                        <div className="mb-2 lg:flex gap-2 hidden">
                          <svg
                            width="23"
                            height="20"
                            viewBox="0 0 23 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_1311_17755)">
                              <path
                                d="M15.9375 16.383L15.3274 12.1919C15.241 11.5983 14.9047 11.0522 14.3819 10.6564C13.8591 10.2605 13.1858 10.0422 12.4886 10.0424H10.3875C9.69061 10.0426 9.01774 10.2611 8.49535 10.6569C7.97296 11.0527 7.63699 11.5986 7.55057 12.1919L6.93952 16.383C6.90598 16.6133 6.92993 16.847 7.00975 17.0687C7.08958 17.2904 7.22347 17.495 7.40253 17.6689C7.58159 17.8428 7.80172 17.9821 8.04831 18.0774C8.29489 18.1727 8.56228 18.2219 8.83273 18.2217H14.0453C14.3156 18.2218 14.5829 18.1725 14.8294 18.0771C15.0759 17.9818 15.2959 17.8425 15.4748 17.6686C15.6538 17.4947 15.7876 17.2902 15.8674 17.0685C15.9471 16.8469 15.971 16.6132 15.9375 16.383V16.383Z"
                                stroke="#195F7E"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.4389 6.77068C13.0184 6.77068 14.2988 5.67207 14.2988 4.31688C14.2988 2.96169 13.0184 1.86308 11.4389 1.86308C9.85949 1.86308 8.5791 2.96169 8.5791 4.31688C8.5791 5.67207 9.85949 6.77068 11.4389 6.77068Z"
                                stroke="#195F7E"
                                strokeWidth="2"
                              />
                              <path
                                d="M3.81281 9.22447C4.86577 9.22447 5.71937 8.49207 5.71937 7.58861C5.71937 6.68515 4.86577 5.95274 3.81281 5.95274C2.75985 5.95274 1.90625 6.68515 1.90625 7.58861C1.90625 8.49207 2.75985 9.22447 3.81281 9.22447Z"
                                stroke="#195F7E"
                                strokeWidth="2"
                              />
                              <path
                                d="M19.0653 9.22447C20.1182 9.22447 20.9718 8.49207 20.9718 7.58861C20.9718 6.68515 20.1182 5.95274 19.0653 5.95274C18.0123 5.95274 17.1587 6.68515 17.1587 7.58861C17.1587 8.49207 18.0123 9.22447 19.0653 9.22447Z"
                                stroke="#195F7E"
                                strokeWidth="2"
                              />
                              <path
                                d="M19.0653 11.6783H19.357C19.8083 11.6782 20.245 11.8155 20.5894 12.0658C20.9338 12.3161 21.1636 12.6631 21.2378 13.045L21.5552 14.6809C21.6008 14.9153 21.5863 15.1553 21.5128 15.3844C21.4392 15.6135 21.3084 15.8261 21.1294 16.0074C20.9504 16.1887 20.7275 16.3344 20.4762 16.4343C20.225 16.5342 19.9514 16.5859 19.6744 16.5859H16.2054M3.81281 11.6783H3.52111C3.06979 11.6782 2.63309 11.8155 2.28869 12.0658C1.94429 12.3161 1.71453 12.6631 1.64029 13.045L1.32285 14.6809C1.27729 14.9153 1.29179 15.1553 1.36533 15.3844C1.43888 15.6135 1.5697 15.8261 1.7487 16.0074C1.92771 16.1887 2.15059 16.3344 2.40186 16.4343C2.65312 16.5342 2.92674 16.5859 3.20367 16.5859H6.67265L3.81281 11.6783Z"
                                stroke="#195F7E"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1311_17755">
                                <rect
                                  width="22.8787"
                                  height="19.6304"
                                  fill="white"
                                  transform="translate(-0.000244141 0.227219)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <h5 className="text-[#195F7E] font-bold">Task Title</h5>
                        </div>
                        <form.Field
                          name="title"
                          children={(field) => {
                            return (
                              <>
                                <input
                                  value={field.state.value || ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="w-full placeholder:text-[#ECECEC] p-2 border border-[#F1F1F1] rounded mb-2"
                                  placeholder="Write here..."
                                />
                                <FieldError field={field} />
                              </>
                            )
                          }}
                        />
                      </div>
                      <div className="">
                        <h5 className="text-black mb-2 lg:hidden">Report Details</h5>
                        <div className="mb-2 lg:flex gap-2 hidden">
                          <h5 className="text-[#195F7E] font-bold">Task Details</h5>
                        </div>
                        <form.Field
                          name="details"
                          children={(field) => {
                            return (
                              <>
                                <textarea
                                  value={field.state.value || ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="text-sm w-full placeholder:text-[#ECECEC] p-2 border border-[#F1F1F1] rounded mb-2"
                                  rows={5}
                                  placeholder="Write here..."
                                ></textarea>
                                <FieldError field={field} />
                              </>
                            )
                          }}
                        />
                      </div>
                      <div className="">
                        <div className="grid grid-cols-3 lg:grid-cols-5">
                          <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                          >
                            {([canSubmit, isSubmitting]) => (
                              <>
                                {/* <button className="col-start-3 lg:col-start-5 w-full rounded-lg p-3 bg-[#0B7077] text-white text-center">
                            Submit Task
                          </button> */}
                                <Button
                                  type="submit"
                                  disabled={!canSubmit}
                                  size="lg"
                                  className="col-start-3 lg:col-start-5 w-full rounded-lg p-3 bg-[#0B7077] text-white text-center"
                                >
                                  Submit Task {isSubmitting && <Spinner />}
                                </Button>
                                <FormError form={form} />
                              </>
                            )}
                          </form.Subscribe>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="hidden lg:grid gap-4">
                    <div className="">
                      {/* <div className="text-[#8E8E93] text-xs mb-2">Today</div> */}
                      <div className="grid gap-2">
                        {reports.map((report) => (
                          <ReportDailyCard key={report.id} report={report} />
                        ))}
                      </div>
                    </div>
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
