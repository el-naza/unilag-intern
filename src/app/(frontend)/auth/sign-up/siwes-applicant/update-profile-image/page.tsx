'use client'

import { Button } from '@/components/ui/button'
import updateUserImage from '@/services/updateUserImage'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { authStore } from '@/store/authStore'
import { useStore } from '@tanstack/react-store'
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'

export default function Page() {
  const router = useRouter()
  const [showInstructions, setShowInstruction] = useState(false)
  const signUpAuthToken = useStore(authStore, (state) => state.signUpAuthToken)
  const signedUpUserId = useStore(authStore, (state) => state.signedUpUserId)

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

  const updateStudentImgMtn = useMutation({
    mutationFn: async (file: File) => {
      try {
        // randomly generate password for students on creation for now
        const res = await updateUserImage('students', signedUpUserId, file, signUpAuthToken)
        console.log('res', res)
        if (!res) {
          toast.error('Network err; pls try again later')
          return 'Network err; pls try again later'
        }
        // return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
        return 'An error occured while saving message; pls try again later'
      }
    },
  })

  const form = useForm<{ file?: File }>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (!value.file) {
          return {
            form: 'A file must be uploaded!',
            fields: { file: 'A file must be uploaded!' },
          }
        }

        const error = await updateStudentImgMtn.mutateAsync(value.file)
        if (error) {
          return {
            form: error as string,
            fields: {},
          }
        }
        // success here so naviagate or toast to success !!
        // form.reset()
        toast.success('Profile image updated successfully')
        router.push('/auth/login')
        return null
      },
    },
  })

  return (
    <div className="text-gray-dark-2 min-h-screen lg:min-h-full py-11 px-4 bg-white">
      <div className="text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-2 text-black-2">
          Upload Profile Image
        </h2>
        <div className="text-[12px] text-gray-dark leading-[16.5px] mb-8 px-6">
          Complete the form to proceed with the signup process.
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col"
      >
        <form.Field name="file">
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
                  <Image src="/static-icons/info-icon.svg" width={16} height={16} alt="icon" />
                </Button>
                <div {...getRootProps()}>
                  <div
                    className={`border-dashed ${isDragActive ? 'border-green-400 bg-gray-100' : ''} border-secondary/50 border-[2px] rounded-lg flex flex-col items-center py-6 mt-3`}
                  >
                    <Image src="/static-icons/upload-icon.svg" width={42} height={42} alt="icon" />
                    <div className="mt-3 mb-2 text-black-2 text-[12px]">
                      Drag your file(s) to start uploading
                    </div>
                    <div className="text-[12px] text-gray-dark leading-[18px] mb-2 flex items-center w-[200px] gap-2">
                      <div className="h-[1px] w-full bg-gray-light-2" />
                      OR
                      <div className="h-[1px] w-full bg-gray-light-2" />
                    </div>

                    <Input
                      {...getInputProps({
                        onChange(e) {
                          // console.log('file', e.target.files?.[0])
                          field.handleChange(e.target.files?.[0])
                        },
                      })}
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

        <div className="text-[12px] text-gray-dark leading-[16.5px] mb-8 mt-3">
          Only support .jpg, .png and .svg files (5mb below)
        </div>

        {/* <Button
          size="lg"
          className="w-full"
          // onClick={() => router.push('/auth/sign-up/siwes-applicant/profile-preview')}
          disabled={!uploadedFile || updateStudentImgMtn.isPending}
          onClick={() => updateStudentImgMtn.isPending || updateStudentImgMtn.mutate(uploadedFile!)}
        >
          Proceed to Log in
        </Button> */}

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <Button type="submit" disabled={!canSubmit} size="lg" className="w-full">
                Proceed to Log in {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>

      {showInstructions && (
        <div
          className="fixed bottom-0 top-0 left-0 right-0 bg-black/20 flex items-end lg:hidden"
          onClick={() => setShowInstruction(false)}
        >
          <Image
            className="w-full"
            src="/images/upload-instructions.svg"
            width={402}
            height={492}
            alt={`Photo Instruction

Instructions
Use a plain, light-colored background.
Ensure your face is fully visible and centered.
Avoid hats, sunglasses, or accessories (unless for religious/medical reasons).
Maintain a neutral expression with clear lighting.
Upload a clear, recent photo (Max size: 5MB, JPEG/PNG format).`}
          />
        </div>
      )}
    </div>
  )
}
