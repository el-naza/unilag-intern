'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useInitials from '@/custom-hooks/useInitials'
import { getStudent, updateStudent } from '@/services/admin/students'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import AssignCompany from './assign-company'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { ValidationFieldError, Field } from 'payload'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'

export default function StudentDetailPage() {
  const { id }: { id: string } = useParams()
  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')

  const [siwesForm, setSiwesForm] = useState<File | null>(null)
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSiwesForm(event.target.files[0])
    }
  }

  const fetchStudentDetail = async () => {
    const res: any = await getStudent('students', id)
    console.log('Student: ', res.data);
    
    setStudent(res.data)
    setLoading(false)
  }

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    fetchStudentDetail()
  }, [])

  const requiredFields = useMemo(
    () => [
      {
        name: 'firstName',
        type: 'text',
        required: true,
      },
      {
        name: 'lastName',
        type: 'text',
        required: true,
      },
      {
        name: 'middleName',
        type: 'text',
        required: false,
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
        name: 'homeAddress',
        type: 'text',
        required: true,
      },
      {
        name: 'matricNo',
        type: 'text',
        required: true,
      },
      {
        name: 'cgpa',
        type: 'text',
        required: true,
      },
      {
        name: 'course',
        type: 'text',
        required: true,
      },
      {
        name: 'level',
        type: 'text',
        required: true,
      },
    ],
    [],
  )

  const form = useForm<any>({
    defaultValues: {
      firstName: student?.firstName || '',
      lastName: student?.lastName || '',
      middleName: student?.middleName || '',
      email: student?.email || '',
      phone: student?.phone || '',
      homeAddress: student?.homeAddress || '',
      matricNo: student?.matricNo || '',
      cgpa: student?.cgpa || '',
      course: student?.course || '',
      level: student?.level || '',
    },
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

        const error = await updateStudentInfo.mutateAsync(value)

        if (error) {
          return {
            form: error as string,
            fields: {},
          }
        }

        toast.success(`Student updated successfully`)
        fetchStudentDetail()
        return null
      },
    },
  })

  const updateStudentInfo = useMutation({
    mutationFn: async (payload: any) => {
      try {
        const res = await updateStudent('students', payload)

        console.log('Result: ', res)

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

  return (
    <form
      className="p-8"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <h1 className="font-semibold text-[1.5rem]">Student Profile</h1>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-between mt-4 p-8 w-full mb-8  bg-[url(/images/profile-bg.png)] bg-cover bg-no-repeat bg-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={student?.picture} alt="Profile" />
            <AvatarFallback className="bg-white">
              {useInitials(`${student?.firstName + ' ' + student?.lastName}`)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-[1.2rem] text-white">
              {student?.firstName} {student?.lastName}
            </h3>
            <p className="text-sm text-white">{student?.course}</p>
          </div>
        </div>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <Button type="submit" disabled={!canSubmit} className="bg-gray-light-2 text-black-2">
                Update Details {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
        <Dialog>
          <DialogTrigger asChild>
            {/* <Button className="bg-gray-light-2 text-black-2">Assigned Siwes</Button> */}
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Assign Company</DialogTitle>
              <DialogDescription>Assign company to a student</DialogDescription>
            </DialogHeader>

            <AssignCompany studentId={student?.id} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3 className="font-medium text-[1.2rem]">Basic Information</h3>
        <p className="text-sm">Student Basic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">First Name</Label>
            <form.Field name="firstName">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter First Name"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div>
            <Label className="mt-3 block">Last Name</Label>
            <form.Field name="lastName">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter Last Name"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div>
            <Label className="mt-3 block">Middle Name</Label>
            <form.Field name="middleName">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter Middle Name"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div className="relative">
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
            <Label className="mt-3 block">Phone</Label>
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
            <Label className="mt-3 block">Address</Label>
            <form.Field name="homeAddress">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter Address"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem]">Academic Information</h3>
        <p className="text-sm">Student Academic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">Matric No</Label>
            <form.Field name="matricNo">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter Matric No."
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div>
            <Label className="mt-3 block">CGPA</Label>
            <form.Field name="cgpa">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter CGPA"
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
            <form.Field name="course">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter Department"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div>
            <Label className="mt-3 block">Level</Label>
            <form.Field name="level">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter Level"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem]">Siwes Form</h3>
        <p className="text-sm">Upload Student Siwes Form</p>

        {!siwesForm && (
          <div className="mt-4">
            <Input
              type="file"
              onChange={selectFile}
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF] w-fit"
            />
          </div>
        )}

        {siwesForm && <p>{siwesForm.name}</p>}

        <h3 className="font-medium text-[1.2rem] mt-8" id="report">
          Siwes Reports
        </h3>
        <p className="text-sm">All supervisors reports</p>

        <p className="font-semibold">No reports yet</p>

        {/* <div className="mt-4">
          <div className="flex gap-4 border-[1px] border-gray-light-2 rounded-[8px] p-4">
            <div className="p-3 rounded-full grid place-content-center bg-primary text-white w-[40px] h-[40px]">
              <MessageSquareText></MessageSquareText>
            </div>
            <div>
              <h4 className="font-medium">Report 001</h4>
              <p className="text-gray-dark-3">By Fredrick Precious 02/03/2023</p>

              <div className="mt-3">
                <p className="text-primary">Message</p>
                <p className="text-gray-dark-3">Student is doing well</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </form>
  )
}
