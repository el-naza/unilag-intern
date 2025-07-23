'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useRouter } from 'next/navigation'
import { FieldApi, FormApi, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Student } from '@/payload-types'
import saveDoc from '@/services/saveDoc'
import Spinner from '@/components/spinner'
import { toast } from 'sonner'
import { ValidationErrors } from '@/utilities/types'
import { Field, ValidationFieldError } from 'payload'
import { Students } from '@/collections/Students'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn, randomString } from '@/utilities'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { password } from 'node_modules/payload/dist/fields/validations'
import { signInUserClient } from '@/services/signinUser'
import { authStore } from '@/store/authStore'
import sendWelcomeEmail from '@/services/sendWelcomeEmail'

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

export default function Page() {
  const router = useRouter()

  const signUpStudentMtn = useMutation({
    mutationFn: async (student: Student) => {
      try {
        // randomly generate password for students on creation for now

        const res = await saveDoc('students', student)
        if (!res) return toast.error('Network err; pls try again later')

        await sendWelcomeEmail(student)

        return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
      }
    },
  })

  const form = useForm<Student>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        const emptyRequiredFields = Students.fields.reduce<object>(
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

        const userCreationObj = { ...value, password: randomString(10) }
        const res = await signUpStudentMtn.mutateAsync(userCreationObj)
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

        const signInRes = await signInUserClient({
          username: userCreationObj.matricNo || userCreationObj.username,
          password: userCreationObj.password,
          col: 'students',
        }).catch(() => {})

        form.reset()

        if (signInRes?.data?.token) {
          authStore.setState((state) => {
            return {
              ...state,
              signUpAuthToken: signInRes?.data?.token!,
              signedUpUserId: signInRes?.data?.user?.id!,
            }
          })
          router.push('/auth/sign-up/siwes-applicant/update-profile-image')
        } else {
          router.push('/auth/login')
          toast.success('Sign up successful, enter your matric no. to continue')

          // router.push('/auth/sign-up/siwes-applicant/update-profile-image')
        }

        return null
      },
    },
  })

  return (
    <div className="text-gray-dark-2 min-h-screen lg:min-h-full py-11 px-4 bg-white">
      <div className="text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-2 text-black-2">
          Sign up Login as a <br /> SIWES Applicant
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
        className="grid grid-cols-2 gap-2"
      >
        <form.Field
          name="firstName"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>First Name</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Name"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="lastName"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Last Name</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Name"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="middleName"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Middle Name</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Name"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="matricNo"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Matriculation Number </Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Matric. Number"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Email</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Email"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="dob"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Date of Birth</Label>
                <br />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'justify-between text-left font-normal mb-3 w-full h-11 border-gray-light-5 text-gray-dark-2',
                        !field.state.value && 'text-muted-foreground',
                      )}
                    >
                      {field.state.value ? (
                        format(field.state.value, 'MM/dd/yyyy')
                      ) : (
                        <span>MM/DD/YYYY</span>
                      )}
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DateCalendar
                      value={new Date(field.state.value || new Date())}
                      onChange={(newValue) =>
                        field.handleChange(newValue?.toISOString?.() || new Date().toISOString())
                      }
                    />
                  </PopoverContent>
                </Popover>
                <br />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="nationality"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Nationality</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Select Nationality"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="stateOfOrigin"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>State of Origin</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Select State of Origin"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="homeAddress"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Home Address</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Address"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="gender"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Gender</Label>
                <Select
                  value={(field.state.value as string) || ''}
                  onOpenChange={(isOpen) => (isOpen ? null : field.handleBlur())}
                  onValueChange={(value) => field.handleChange(value as any)}
                >
                  <SelectTrigger
                    className={`${field.state.value ? '' : 'text-muted-foreground'} mb-3`}
                  >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      Students.fields.find(
                        (f: Field & { name: string; options: string[] }) => f.name === field.name,
                      ) as { options: string[] }
                    )?.options?.map((option, i) => (
                      <SelectItem value={option} key={i}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="course"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Course of Study</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Select Course of Study"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="level"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Level</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="300"
                  className={`bg-white/40 backdrop-blur-[70px] border-gray-light-5 border-[1px] mb-3 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Field
          name="internshipType"
          children={(field) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <Label>Internship Type</Label>
                <Select
                  value={(field.state.value as string) || ''}
                  onOpenChange={(isOpen) => (isOpen ? null : field.handleBlur())}
                  onValueChange={(value) => field.handleChange(value as any)}
                >
                  <SelectTrigger
                    className={`${field.state.value ? '' : 'text-muted-foreground'} mb-3`}
                  >
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      Students.fields.find(
                        (f: Field & { name: string; options: string[] }) => f.name === field.name,
                      ) as { options: string[] }
                    )?.options?.map((option, i) => (
                      <SelectItem value={option} key={i}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError field={field} />
              </div>
            )
          }}
        />
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <div className="col-span-2">
              <Button
                type="submit"
                disabled={!canSubmit}
                size="lg"
                className="w-full mt-5"
                variant="secondary"
              >
                Continue {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </div>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
