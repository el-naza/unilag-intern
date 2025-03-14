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

export default function InternshipPost() {
  const router = useRouter()
  const { data: session } = useSession()
  const user = useMemo<any>(() => session?.user, [session])
  const [showInstructions, setShowInstruction] = useState(false)
  // const signUpAuthToken = useStore(authStore, (state) => state.signUpAuthToken)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [postId, setPostId] = useState<string | null>(null)

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDropRejected(fileRejections: FileRejection[], event: DropEvent) {
      // console.log('Some files rejected', fileRejections, 'ev', event)
      toast.error('File(s) rejected: Follow the instructions to upload acceptable file(s)')
    },
    onError(err: Error) {
      // console.log('An error occured', err)
      toast.error('An error occured with your file; try again')
    },
    noClick: true,
    accept: { 'image/*': ['.png', '.svg', '.jpg', '.jpeg'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
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
          location: Internship.location,
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
                {/* <form.Field
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
                /> */}
                <form.Field name="image">
                  {(field) => {
                    return (
                      <>
                        {!!field.state.value && (
                          <Image
                            src={URL.createObjectURL(field.state.value)}
                            className="mx-auto rounded-full w-[64px] aspect-square"
                            width={64}
                            height={64}
                            alt="Uploaded Image Will Show Here"
                          />
                        )}
                        <Button
                          variant={'ghost'}
                          className="p-[1.5px] h-auto self-end"
                          onClick={() => setShowInstruction(true)}
                          type="button"
                        >
                          <Image
                            src="/static-icons/info-icon.svg"
                            width={16}
                            height={16}
                            alt="icon"
                          />
                        </Button>

                        <div {...getRootProps()}>
                          <div
                            className={`border-dashed ${isDragActive ? 'border-green-400 bg-gray-100' : ''} border-secondary/50 border-[2px] rounded-lg flex flex-col items-center py-6 mt-3`}
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
                        <Label clasName="text-[#48484A]">Course Area</Label>
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
               
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
