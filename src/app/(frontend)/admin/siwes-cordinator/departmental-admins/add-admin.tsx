'use client'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createAdmin } from '@/services/admin/admins'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { User } from 'lucide-react'
import { Field, ValidationFieldError } from 'payload'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

interface IAdminProp {
  onCloseEmit: () => void
}

const AddAdmin = ({ onCloseEmit }: IAdminProp) => {
  const closeDialog = () => {
    onCloseEmit()
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profilePicture, setProfilePicture] = useState<string>('')
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      if (profilePicture) URL.revokeObjectURL(profilePicture)
      const img = URL.createObjectURL(file)
      setProfilePicture(img)
      setProfilePictureFile(file)
    }
  }

  const saveAdmin = useMutation({
    mutationFn: async (payload: any) => {
      try {
        const res = await createAdmin('admins', payload)

        console.log('Result: ', res);
        

        if (!res) {
          const errMsg = 'Network err; pls try again later'
          toast.error(errMsg)
          return errMsg
        }

        if (res.status === 500) {
          const errMsg = 'Server error pls try again later'
          toast.error(errMsg)
          return errMsg
        }

        if (res.success && res.status !== 500) return

        return res.data?.message
      } catch {
        const errMsg = 'An error occured; pls try again later'
        toast.error(errMsg)
        return errMsg
      }
    },
  })

  const requiredFields = React.useMemo(
    () => [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        type: 'text',
        required: true,
      },
      {
        name: 'phone',
        type: 'text',
        required: true,
      },
      {
        name: 'department',
        type: 'text',
        required: true,
      },
    ],
    [],
  )

  const form = useForm<{ name: string; email: string; phone: string; department: string }>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        const emptyRequiredFields = requiredFields.reduce<object>(
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

        const { name, email, phone, department } = value

        // const formData = new FormData()
        // profilePictureFile && formData.append('Profile_Picture', profilePictureFile)
        // formData.append('name', name)
        // formData.append('email', email)
        // formData.append('phone', phone)
        // formData.append('department', department)

        const error = await saveAdmin.mutateAsync(value)

        if (error) {
          return {
            form: error as string,
            fields: {},
          }
        }

        form.reset()
        closeDialog()
        toast.success('Admin created successfully')
        return null
      },
    },
  })

  return (
    <form
      className="p-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div
        className="w-[7rem] h-[7rem] rounded-full bg-gray-light-2 grid place-content-center mx-auto cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {!profilePicture && <User />}
        {profilePicture && (
          <Avatar className="w-[6.5rem] h-[6.5rem]">
            <AvatarImage src={profilePicture} alt="Profile" />
          </Avatar>
        )}
        <Input
          ref={fileInputRef}
          type="file"
          onChange={selectFile}
          className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF] w-fit hidden"
        />
      </div>
      <p className="text-center mb-8 mt-3">Upload admin profile image</p>

      <div>
        <Label className="mt-3 block">Name</Label>
        <form.Field name="name">
          {(field) => {
            return (
              <>
                <Input
                  name={field.name}
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                />
                <FieldError field={field} />
              </>
            )
          }}
        </form.Field>
      </div>

      <div>
        <Label className="mt-3 block">Email</Label>
        <form.Field name="email">
          {(field) => {
            return (
              <>
                <Input
                  name={field.name}
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="Enter Email"
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                />
                <FieldError field={field} />
              </>
            )
          }}
        </form.Field>
      </div>

      <div>
        <Label className="mt-3 block">Phone Number</Label>
        <form.Field name="phone">
          {(field) => {
            return (
              <>
                <Input
                  name={field.name}
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="Enter Phone Number"
                  className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                />
                <FieldError field={field} />
              </>
            )
          }}
        </form.Field>
      </div>

      <div>
        <Label className="mt-3 block">Department</Label>
        <form.Field name="department">
          {(field) => {
            return (
              <>
                <Select
                  value={field.state.value || ''}
                  onValueChange={field.handleChange}
                  onBlur={field.handleBlur}
                >
                  <SelectTrigger className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]">
                    <SelectValue placeholder="Choose Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="student-name">Student Name</SelectItem>
                      <SelectItem value="course">Course</SelectItem>
                      <SelectItem value="matric-number">Matric Number</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError field={field} />
              </>
            )
          }}
        </form.Field>
      </div>

      <div>
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <div className="flex items-center justify-center gap-8 mt-8">
                <Button type="submit" disabled={!canSubmit}>
                  Save {isSubmitting && <Spinner />}
                </Button>

                <Button variant="outline" type="button" onClick={() => closeDialog()}>
                  Cancel
                </Button>
              </div>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

export default AddAdmin
