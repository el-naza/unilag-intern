'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import ReportDailyCard from '@/app/(frontend)/components/Cards/ReportDailyCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Report, Student } from '@/payload-types'
import saveDoc from '@/services/saveDoc'
import { toast } from 'sonner'
import { Reports } from '@/collections/Reports'
import { Field, ValidationFieldError } from 'payload'
import { ValidationErrors } from '@/utilities/types'
import FieldError from '@/components/FieldError'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import fetchStudentReports from '@/services/fetchStudentReports'
import { format, isToday, isYesterday } from 'date-fns'
import fetchMe from '@/services/fetchMe'

export default function Page() {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => (await fetchMe('students'))?.user as Student | undefined,
  })

  const user = useMemo<any>(() => meQuery.data, [meQuery.data])

  const saveReportMtn = useMutation({
    mutationFn: async (report: Report) => {
      try {
        // randomly generate password for reports on creation for now
        const res = await saveDoc('reports', report)
        console.log(res)
        if (!res) return toast.error('Network err; pls try again later')

        return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
      }
    },
  })

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    queryFn: () => fetchStudentReports(),
  })

  // if (status === 'authenticated' && !session.user) {
  //   // signOut()
  //   router.replace('/auth/login')
  // }

  return (
    <div className="min-h-screen relative text-sm text-black py-0 lg:py-20">
      <div className="z-10 fixed rounded-b-lg bg-[#0B7077] h-[50%] w-full top-0 hidden lg:block"></div>
      <div className="container z-20 relative">
        <Link className="lg:block" href={'/student'}>
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
                <h5 className="text-black font-bold lg:font-medium lg:text-2xl">Reports</h5>
              </div>
              <div className="flex">
                <Link className="lg:hidden" href="/student/reports">
                  <span className="text-[#0B7077]">Records (0)</span>
                </Link>
                {/* <span className="hidden lg:block text-sm my-auto">17 Thurs - 5:03pm</span> */}
              </div>
            </div>

            <div
              className="rounded-[4px] p-8"
              style={{
                border: '1px solid #E4E4E4',
                background: 'linear-gradient(0deg, #F9F9F9 0%, #F9F9F9 100%), #FFF',
              }}
            >
              <div className="bg-white p-7 space-y-4">
                {new Array(12).fill(undefined).map((_, i) => {
                  const form = useForm<Partial<Report>>({
                    defaultValues: {
                      week: i + 1,
                      student: user?.id,
                    },
                    validators: {
                      onSubmitAsync: async ({ value }) => {
                        if (!user?.employedBy?.employment) {
                          toast.error("You haven't been employed yet")
                          return null
                        }
                        value.employment = user?.employedBy?.employment?.id
                        value.student = user?.id
                        const emptyRequiredFields = Reports.fields.reduce<object>(
                          (
                            acc: ValidationFieldError,
                            field: Field & { required: boolean; name: string },
                          ) => ({
                            ...acc,
                            ...(field?.required &&
                              !value[field.name] && { [field.name]: 'Required' }),
                          }),
                          {},
                        )
                        if (Object.keys(emptyRequiredFields).length) {
                          console.log(emptyRequiredFields)
                          return {
                            form: 'Some required fields are missing. Please fill out all mandatory fields to proceed.',
                            fields: emptyRequiredFields,
                          }
                        }

                        console.log('submitted form values', value)
                        // return null
                        const res = await saveReportMtn.mutateAsync(value as Report)
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

                        // success here so naviagate or toast to success !!
                        form.reset()
                        toast.success('Report saved successful')
                        reportsQuery.refetch()
                        // router.push('/student')
                        // router.refresh()

                        return null
                      },
                    },
                  })

                  const fileInputRef = useRef<HTMLInputElement>(null)

                  return (
                    <Accordion type="single" collapsible key={i}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-[#F2F2F2] px-4">
                          <div className="flex justify-between w-full pr-8">
                            <div>
                              <span className="font-medium pr-3">
                                Week {i + 1}
                                {/* # */}
                              </span>
                              {/* <span className="text-[#555]">1/3/2025</span> */}
                            </div>
                            {/* <span className="text-[#34C759]">Successful</span> */}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              form.handleSubmit()
                            }}
                            className="grid gap-4"
                          >
                            <div className=" lg:block">
                              <div className="bg-[#F2F2F2] p-4 flex">
                                <form.Field
                                  name="media"
                                  children={(field) => {
                                    return (
                                      <>
                                        <div
                                          onClick={() => fileInputRef.current?.click?.()}
                                          style={{
                                            backgroundImage: `url(${URL.createObjectURL((field?.state?.value as any as File) || new Blob())})`,
                                          }}
                                          className="rounded-full overflow-hidden bg-[#F1F1FF] bg-no-repeat bg-cover border-[#E9E9E9] border-[1px] m-auto h-[150px] w-[150px] flex"
                                        >
                                          <div className="w-full items-center justify-center flex flex-col gap-2 bg-white/50">
                                            <div className="flex">
                                              <svg
                                                className="m-auto"
                                                width="36"
                                                height="31"
                                                viewBox="0 0 36 31"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g clipPath="url(#clip0_1311_17784)">
                                                  <path
                                                    d="M5.18185 5.70606V2.02536H8.04169V5.70606H12.3314V8.15985H8.04169V11.8405H5.18185V8.15985H0.89209V5.70606H5.18185ZM9.4716 13.0674V9.38675H13.7614V5.70606H23.7708L26.3875 8.15985H30.9204C32.4933 8.15985 33.7802 9.26406 33.7802 10.6136V25.3364C33.7802 26.686 32.4933 27.7902 30.9204 27.7902H8.04169C6.46877 27.7902 5.18185 26.686 5.18185 25.3364V13.0674H9.4716ZM19.481 24.1095C23.4276 24.1095 26.6306 21.3613 26.6306 17.975C26.6306 14.5888 23.4276 11.8405 19.481 11.8405C15.5345 11.8405 12.3314 14.5888 12.3314 17.975C12.3314 21.3613 15.5345 24.1095 19.481 24.1095ZM14.9053 17.975C14.9053 20.1467 16.9501 21.9011 19.481 21.9011C22.012 21.9011 24.0568 20.1467 24.0568 17.975C24.0568 15.8034 22.012 14.049 19.481 14.049C16.9501 14.049 14.9053 15.8034 14.9053 17.975Z"
                                                    fill="#195F7E"
                                                  />
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_1311_17784">
                                                    <rect
                                                      width="34.3181"
                                                      height="29.4456"
                                                      fill="white"
                                                      transform="translate(0.89209 0.798462)"
                                                    />
                                                  </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                            <span className="text-xs">Upload Image</span>
                                            <Input
                                              type="file"
                                              ref={fileInputRef}
                                              // value={(field.state.value as any) || ''}
                                              onBlur={field.handleBlur}
                                              onChange={(e) => {
                                                console.log(
                                                  'value type instance',
                                                  e.target.files?.[0],
                                                  typeof e.target.files?.[0],
                                                  e.target.files?.[0] instanceof File,
                                                )
                                                field.handleChange(e.target.files?.[0] as any)
                                              }}
                                              className="hidden"
                                            />
                                          </div>
                                        </div>
                                      </>
                                    )
                                  }}
                                />
                              </div>
                            </div>
                            <div className="lg:mx-20 lg:my-10 grid gap-3">
                              <form.Field
                                name="title"
                                children={(field) => {
                                  return (
                                    <div className="col-span-2 md:col-span-1">
                                      <Input
                                        value={field.state.value || ''}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Report Title ★"
                                        className={`bg-white/40 placeholder:text-[#ccc] backdrop-blur-[70px] border-gray-light-5 border-[1px] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                                      />
                                      <FieldError field={field} />
                                    </div>
                                  )
                                }}
                              />
                              <form.Field
                                name="supervisor"
                                children={(field) => {
                                  return (
                                    <div className="col-span-2 md:col-span-1">
                                      <Input
                                        value={field.state.value || ''}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Supervisor name  ★"
                                        className={`bg-white/40 placeholder:text-[#ccc] backdrop-blur-[70px] border-gray-light-5 border-[1px] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                                      />
                                      <FieldError field={field} />
                                    </div>
                                  )
                                }}
                              />
                              <form.Field
                                name="details"
                                children={(field) => {
                                  return (
                                    <div className="col-span-2 md:col-span-1">
                                      <Textarea
                                        value={field.state.value || ''}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Report Details ★"
                                        className={`bg-white/40 placeholder:text-[#ccc] backdrop-blur-[70px] border-gray-light-5 border-[1px] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                                      />
                                      <FieldError field={field} />
                                    </div>
                                  )
                                }}
                              />
                              <form.Field
                                name="memo"
                                children={(field) => {
                                  return (
                                    <div className="col-span-2 md:col-span-1">
                                      <Textarea
                                        value={field.state.value || ''}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Write Memo"
                                        className={`bg-white/40 placeholder:text-[#ccc] backdrop-blur-[70px] border-gray-light-5 border-[1px] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                                      />
                                      <FieldError field={field} />
                                    </div>
                                  )
                                }}
                              />

                              <div className="">
                                <form.Subscribe
                                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                                >
                                  {([canSubmit, isSubmitting]) => (
                                    <div className="flex w-full justify-center">
                                      <Button
                                        type="submit"
                                        disabled={!canSubmit}
                                        variant={'secondary'}
                                        size="lg"
                                        className="mx-auto mt-4 text-gr text-white ml-auto"
                                      >
                                        Send Report {isSubmitting && <Spinner />}
                                      </Button>
                                      <FormError form={form} />
                                    </div>
                                  )}
                                </form.Subscribe>
                              </div>
                            </div>
                            <div className="hidden lg:grid gap-4">
                              {/* {reportsQuery?.data?.[i.toString()]} */}
                              {reportsQuery?.data?.[(i + 1).toString()]?.map((report, i, arr) => {
                                const formattedDate = getFormattedDate(new Date(report.createdAt))
                                return (
                                  <div className="">
                                    {i - 1 >= 0 &&
                                    getFormattedDate(new Date(arr[i - 1].createdAt)) ===
                                      formattedDate ? null : (
                                      <div className="text-[#8E8E93] text-xs mb-2">
                                        {formattedDate}
                                      </div>
                                    )}
                                    <div className="grid gap-2">
                                      <ReportDailyCard {...report} />
                                      {/* <ReportDailyCard time="1:32 am" /> */}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </form>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function getFormattedDate(date: Date) {
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return format(new Date(), 'EEE do MMMM yyyy')
}

function getFormattedTime(date: Date) {
  return format(date, 'h:mm a')
}
