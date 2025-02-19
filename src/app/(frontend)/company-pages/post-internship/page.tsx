'use client'
import { useRouter } from 'next/navigation'
import NavBar from '../../common/nav-bar'
import ArrowIcon from '../../assets/icons/arrow'

import { useMemo, useState } from 'react'
import CalenderIcon from '../../assets/icons/calander'

import FileUploader from '../../components/Form/fileUploader'
import MainButton from '../../components/Ui/button'
import TextArea from '../../components/Form/textArea'
import SelectTag from '../../components/Form/select'
import { FieldApi, FormApi, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import Spinner from '@/components/spinner'
import { ValidationErrors } from '@/utilities/types'
import { Field, ValidationFieldError } from 'payload'
import { toast } from 'sonner'
import { Internship } from '@/payload-types'
import saveDoc from '@/services/saveDoc'
import { Internships } from '@/collections/Companies/Internships'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { join } from 'path'

export default function InternshipPost() {
  const router = useRouter()
  const { data: session } = useSession()
  const user = useMemo<any>(() => session?.user, [session])

  const handleFileChange = (files: File[]) => {
    console.log('Selected files:', files)
  }

  const areas = [
    { value: 'north', label: 'North Area' },
    { value: 'south', label: 'South Area' },
    { value: 'east', label: 'East Area' },
    { value: 'west', label: 'West Area' },
  ]

  function FieldError({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
      <>
        {field.state.meta.isTouched && field.state.meta.errors.length ? (
          <div className="text-[10px] leading-[16.5px] text-error -mt-[10.5px] mb-3">
            {field.state.meta.errors.join(',')}
          </div>
        ) : null}
      </>
    )
  }
  function FormError({ form }: { form: FormApi<any, any> }) {
    return (
      <>
        {form.state.errors.length ? (
          <div className="text-[10px] leading-[16.5px] text-error mt-2">
            {form.state.errors.join(',')}
          </div>
        ) : null}
      </>
    )
  }

  const createInternshipPostMtn = useMutation({
    mutationFn: async (Internship: Internship) => {
      console.log(Internship)
      try {
        const res = await saveDoc('internships', {
          // ...Internship,
          company: user?.id,
          jobDescription: Internship.jobDescription,
          location: Internship.location,
          picture: Internship.picture,
          startDate: Internship.startDate,
          endDate: Internship.endDate,
          postDescription: Internship.postDescription,
        })
        console.log('res', res)
        if (!res) return toast.error('Network err; pls try again later')
        return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
      }
    },
  })

  const form = useForm<Internship>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        value.company = user?.id
        const emptyRequiredFields = Internships.fields.reduce<object>(
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

        const res = await createInternshipPostMtn.mutateAsync(value)
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

        // success here so naviagate or toast to success
        form.reset()
        toast.success('Internship successful')
        // router.push('/auth/sign-up/siwes-applicant/update-profile-image')
        // router.push('/company-auth/login')

        return null
      },
    },
  })

  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar fill="#0B7077" />
      </nav>
      <div className=" max-w-[866px] m-auto lg:mt-[58px] pb-[100px] ">
        <div className="flex items-center ">
          <button
            className="flex items-center gap-[6px] font-[400] text-[14px] p-[24px] lg:p-0"
            onClick={() => router.back()}
          >
            <ArrowIcon />
            Back
          </button>
          <div className=" absolute left-0 right-0 w-full flex items-center justify-center m-auto">
            <h3 className="font-[500] text-[20px] ">Internship Post</h3>
          </div>
        </div>

        <div className="gap-5 lg:flex-row md:flex-row px-[10px] py-[6px] px-4">
          <h3 className="font-[700] text-[16px] mb-[12px] mt-[24px]">Post Image</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 w-full">
              <div className="h-[217px] lg:w-[376px] w-full  relative overflow-hidden ">
                <form.Field
                  name="picture"
                  children={(field) => {
                    return (
                      <>
                        <FileUploader
                          id="file-upload"
                          name="fileUpload"
                          accept=".jpg,.png,.svg,.zip"
                          multiple={true}
                          maxFileSize={2} // 2MB
                          onFileChange={handleFileChange}
                        />
                      </>
                    )
                  }}
                />
              </div>
              <div className="lg:w-[446px]  w-[100%]">
                <form.Field
                  name="postDescription"
                  children={(field) => {
                    return (
                      <>
                        <Label>Post Description</Label>

                        <textarea
                          value={field.state.value || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full h-[120px] py-[8px] px-[12px] outline-none mb-[12px] bg-white"
                          rows={5}
                          placeholder="Enter job requirements"
                        ></textarea>
                        <FieldError field={field} />
                      </>
                    )
                  }}
                />

                <form.Field
                  name="location"
                  children={(field) => {
                    return (
                      <>
                        <Label>Location</Label>
                        <Select
                          value={field.state.value || ''}
                          onOpenChange={(isOpen) => (isOpen ? null : field.handleBlur())}
                          onValueChange={(value) => field.handleChange(value)}
                        >
                          <SelectTrigger
                            className={`${field.state.value ? '' : 'text-muted-foreground'} mb-3 border mb-3 placeholder:text-[#969a9b] bg-white`}
                          >
                            <SelectValue
                              placeholder="Select Course Area"
                              className="text-[#969a9b] bg-white"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {(
                              Internships.fields.find(
                                (f: Field & { name: string; options: string[] }) =>
                                  f.name === field.name,
                              ) as { options: string[] }
                            )?.options?.map((option, i) => (
                              <SelectItem value={option} key={i}         className="bg-white">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError field={field} />
                      </>
                    )
                  }}
                />
                <div className="mb-[12px]">
                  <label htmlFor="" className="mb-[8px] font-[400] text-[14px] text-[#48484A]">
                    Acceptance Period
                  </label>
                  <div className="max-h-[120px] w-full border  rounded-[4px] bg-white flex items-center justify-between  font-[400] text-[14px] text-[#48484A] py-[8px] px-[12px] ">
                    <form.Field
                      name="startDate"
                      children={(field) => {
                        return (
                          <div className="flex flex-col gap-3">
                            <input
                              type="date"
                              value={field.state.value || ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              className="text-[#8E8E93] font-[400] text-[12px]"
                            />
                            <FieldError field={field} />
                          </div>
                        )
                      }}
                    />
                    -
                    <form.Field
                      name="endDate"
                      children={(field) => {
                        return (
                          <div className="flex flex-col gap-3">
                            <input
                              type="date"
                              value={field.state.value || ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              className="text-[#8E8E93] font-[400] text-[12px]"
                            />
                            <FieldError field={field} />
                          </div>
                        )
                      }}
                    />
                    {/* <CalenderIcon /> */}
                    {/* <p className="text-[#8E8E93] font-[400] text-[12px]">00/00/00 - 00/00/00</p>
                    <CalenderIcon /> */}
                  </div>
                </div>

                <form.Field
                  name="jobDescription"
                  children={(field) => {
                    return (
                      <>
                        <Label>Job Description</Label>

                        <textarea
                          value={field.state.value || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full h-[120px] py-[8px] px-[12px] outline-none mb-[12px]"
                          rows={5}
                          placeholder="Enter job requirements"
                        ></textarea>
                        <FieldError field={field} />
                      </>
                    )
                  }}
                />
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <>
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        size="lg"
                        className="w-full mt-5"
                        variant="secondary"
                        color="white"
                      >
                        Send Post {isSubmitting && <Spinner />}
                      </Button>
                      <FormError form={form} />
                    </>
                  )}
                </form.Subscribe>
                {/* <MainButton
                  title="Send Post"
                  borderRadius="rounded"
                  fontWeight="font-[400]"
                  fontSize="text-[14px]"
                /> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
