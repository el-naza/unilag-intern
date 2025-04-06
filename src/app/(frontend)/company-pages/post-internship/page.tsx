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
import { FieldApi, FormApi, useForm, useStore } from '@tanstack/react-form'
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
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { authStore } from '@/store/authStore'
import updateUserImage from '@/services/updateUserImage'
import RedCancelIcon from '../../assets/icons/redcancel'

export default function InternshipPost() {
  const router = useRouter()
  const { data: session } = useSession()
  const user = useMemo<any>(() => session?.user, [session])
  const [showInstructions, setShowInstruction] = useState(false)
  // const signUpAuthToken = useStore(authStore, (state) => state.signUpAuthToken)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [postId, setPostId] = useState<string | null>(null)

  // const handleFileChange = (files: File[]) => {
  //   if (files.length > 0) {
  //     setSelectedFile(files[0])
  //   }
  // }

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setSelectedFile(file)
      } else {
        toast.error('Only image and PDF files are allowed.')
      }
    }
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
  }

  // const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  //   onDropRejected(fileRejections: FileRejection[], event: DropEvent) {
  //     // console.log('Some files rejected', fileRejections, 'ev', event)
  //     toast.error('File(s) rejected: Follow the instructions to upload acceptable file(s)')
  //   },
  //   onError(err: Error) {
  //     // console.log('An error occured', err)
  //     toast.error('An error occured with your file; try again')
  //   },
  //   noClick: true,
  //   accept: { 'image/*': ['.png', '.svg', '.jpg', '.jpeg'] },
  //   maxFiles: 1,
  //   maxSize: 5 * 1024 * 1024,
  // })

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDropRejected(fileRejections: FileRejection[], event: DropEvent) {
      toast.error('File(s) rejected: Follow the instructions to upload acceptable file(s)')
    },
    onError(err: Error) {
      toast.error('An error occurred with your file; try again')
    },
    noClick: true,
    accept: {
      'image/*': ['.png', '.svg', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB limit
  })

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

  // const createInternshipPostMtn = useMutation({
  //   mutationFn: async (Internship: Internship) => {
  //     console.log(Internship)
  //     try {
  //       const res = await saveDoc('internships', {
  //         // ...Internship,
  //         company: user?.id,
  //         jobDescription: Internship.jobDescription,
  //         location: Internship.location,
  //         // image: Internship.image,
  //         startDate: Internship.startDate,
  //         endDate: Internship.endDate,
  //         postDescription: Internship.postDescription,
  //       })
  //       console.log('res', res)

  //       if (res?.status == 201) {
  //         setPostId(res.data.doc.id)
  //         updatePostImgMtn()
  //       } else {
  //         return toast.error('Network err; pls try again later')
  //       }

  //       return res
  //     } catch {
  //       toast.error('An error occured while saving message; pls try again later')
  //     }
  //   },
  // })

  const createInternshipPostMtn = useMutation({
    mutationFn: async (Internship: Internship) => {
      console.log('intership', Internship)
      console.log('selected image', selectedFile)
      try {
        const res = await saveDoc('internships', {
          company: user?.id,
          jobDescription: Internship.jobDescription,
          courseArea: Internship.courseArea,
          startDate: Internship.startDate,
          endDate: Internship.endDate,
          postDescription: Internship.postDescription,
        })
        console.log('res', res)

        if (res?.status == 201) {
          const newPostId = res?.data?.doc?.id as any
          setPostId(newPostId)
          console.log('new post ', newPostId)

          // Ensure the post ID is set before uploading the image
          if (selectedFile) {
            await updatePostImgMtn.mutateAsync({ postId: newPostId, file: selectedFile })
          }

          return res
        } else {
          toast.error('Network error; please try again later')
        }
      } catch {
        toast.error('An error occurred while saving the message; please try again later')
      }
    },
  })

  const updatePostImgMtn = useMutation({
    mutationFn: async ({ postId, file }: { postId: string; file: File }) => {
      try {
        const res = await updateUserImage('internships', postId, file)
        console.log('image upload ', res)
        if (!res) {
          return toast.error('Network error; please try again later')
        }
        return res
      } catch {
        toast.error('An error occurred while uploading the image; please try again later')
      }
    },
  })

  // const updatePostImgMtn = useMutation({
  //   mutationFn: async (file: File) => {
  //     try {
  //       // randomly generate password for students on creation for now
  //       const res = await updateUserImage('internships', postId, file, signUpAuthToken)
  //       console.log('res', res)
  //       if (!res) return toast.error('Network err; pls try again later')
  //       return res
  //     } catch {
  //       toast.error('An error occured while saving message; pls try again later')
  //     }
  //   },
  // })

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
              <div className="h-[] lg:w-[376px] w-full  relative overflow-hidden ">
                <form.Field name="image">
                  {(field) => {
                    return (
                      <>
                        <div {...getRootProps()}>
                          <div
                            className={`border-dashed bg-white ${isDragActive ? 'border-green-400 bg-gray-100' : ''} border-secondary/50 border-[2px] rounded-lg flex flex-col items-center py-6 mt-3`}
                          >
                            <Image
                              src="/static-icons/upload-icon.svg"
                              width={42}
                              height={42}
                              alt="icon"
                            />
                            <div className="mt-3 mb-2 text-black-2 text-[12px]">
                              Drag your file(s) to start uploading
                            </div>
                            <div className="text-[12px] text-gray-dark leading-[18px] mb-2 flex items-center w-[200px] gap-2">
                              <div className="h-[1px] w-full bg-gray-light-2" />
                              OR
                              <div className="h-[1px] w-full bg-gray-light-2" />
                            </div>

                            <Input
                              // {...getInputProps({
                              //   onChange(e) {

                              //     field.handleChange(e.target.files?.[0])
                              //   },
                              // })}
                              {...getInputProps()}
                              onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                              hidden
                              type="file"
                              multiple={false}
                              name={field.name}
                              onBlur={field.handleBlur}
                              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1"
                            />
                            <FieldError field={field} />

                            <Button variant="outline" size="sm" type="button" onClick={open}>
                              Browse files
                            </Button>
                          </div>
                          {selectedFile && (
                            <div className="mt-4 w-full flex flex-col items-start border p-2">
                              <div className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-2 ">
                                  {selectedFile.type.startsWith('image/') ? (
                                    <Image
                                      src={URL.createObjectURL(selectedFile)}
                                      alt="Preview"
                                      width={50}
                                      height={50}
                                      className="rounded-md shadow"
                                    />
                                  ) : (
                                    
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
                                    
                                  )}

                                  <p className="font-[400] text-[12px] text-[black] truncate w-full overflow-hidden whitespace-nowrap max-w-[100px]">
                                    {selectedFile.name}
                                  </p>

                                  <p className="font-[400] text-[12px] text-[#8E8E93] whitespace-nowrap">
                                    {selectedFile.size > 1024 * 1024
                                      ? (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB'
                                      : (selectedFile.size / 1024).toFixed(2) + ' KB'}
                                  </p>
                                </div>

                                <button onClick={removeSelectedFile} className="">
                                  <RedCancelIcon />
                                </button>
                              </div>

                              {/* <p className="mt-2 text-sm text-gray-600">{selectedFile.name}</p> */}
                            </div>
                          )}
                        </div>
                      </>
                    )
                  }}
                </form.Field>
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
                  name="courseArea"
                  children={(field) => {
                    return (
                      <>
                        <Label className="text-[#48484A]">Course Area</Label>
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
                              className="text-[#8E8E93] bg-white text-[12px]"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {(
                              Internships.fields.find(
                                (f: Field & { name: string; options: string[] }) =>
                                  f.name === field.name,
                              ) as { options: string[] }
                            )?.options?.map((option, i) => (
                              <SelectItem value={option} key={i} className="bg-white">
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
                          className="w-full h-[120px] py-[8px] px-[12px] outline-none mb-[12px]  bg-white"
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
                        className="lg:w-[104px] w-full mt-5"
                        variant="secondary"
                        color="white"
                      >
                        Send Post {isSubmitting && <Spinner />}
                      </Button>
                      <FormError form={form} />
                    </>
                  )}
                </form.Subscribe>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
