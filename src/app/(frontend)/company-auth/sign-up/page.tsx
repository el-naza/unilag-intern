'use client'
import MailIcon from '../../assets/icons/mail'
import DynamicForm from '../../components/Form'
import ArrowIcon from '../../assets/icons/arrow'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import saveDoc from '@/services/saveDoc'
import { toast } from 'sonner'
import { Company } from '@/payload-types'
import Spinner from '@/components/spinner'
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
import { useRouter } from 'next/navigation'
import { FieldApi, FormApi, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Companies } from '@/collections/Companies'

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

export default function OTPConfirmation() {

  const router = useRouter()

  const signUpCompanytMtn = useMutation({
    mutationFn: async (company: Company) => {
      try {
        console.log(company)
        const res = await saveDoc('companies', { ...company, password: randomString(10) })
        console.log('res', res)
        if (!res) return toast.error('Network err; pls try again later')
        return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
      }
    },
  })

  const form = useForm<Company>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        const emptyRequiredFields = Companies.fields.reduce<object>(
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

        const res = await signUpCompanytMtn.mutateAsync(value)
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
        toast.success('Sign up successful')
        // router.push('/auth/sign-up/siwes-applicant/update-profile-image')
        router.push('/company-auth/login')

        return null
      },
    },
  })

  return (
    <div className="">
      <button
        onClick={() => router.back()}
        className="font-[400] text-[14px] flex items-center gap-3 text-[#0C0C0C]"
      >
        <ArrowIcon /> Back
      </button>
      <h2 className="font-[500] text-[24px] text-center mt-[40px]">Sign up as a Siwes Company'</h2>
      <p className="text-center text-gray-dark-2 font-[400] text-[14px] mt-8 mb-[40px]">
        Enter your company information to proceed
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="name"
          children={(field) => {
            return (
              <>
                <Label>Company Name</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Company Name"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <Label>Email</Label>
                <Input
                  value={field.state.value || ''}
                  type="email"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Email"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />

        <form.Field
          name="phone"
          children={(field) => {
            return (
              <>
                <Label>Company phone No.</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter phone No."
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />

        <form.Field
          name="address"
          children={(field) => {
            return (
              <>
                <Label>Company Address</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Address"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />
        <form.Field
          name="location.longitude"
          children={(field) => {
            return (
              <>
                <Label>Longitude</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))} // Ensure it's a number
                  placeholder="Enter Longitude"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2 border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />
        <form.Field
          name="location.latitude"
          children={(field) => {
            return (
              <>
                <Label>Latitude</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))} // Ensure it's a number
                  placeholder="Enter Latitude"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2 border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />

        <form.Field
          name="courseAreas"
          children={(field) => {
            // Manually defined options

            return (
              <>
                <Label>Course Areas</Label>
                <Select
                  value={(field.state.value as string[]) || ''}
                  onOpenChange={(isOpen) => (isOpen ? null : field.handleBlur())}
                  onValueChange={(value) => {
                    console.log('Selected Course Area:', value) // Debugging
                    field.handleChange(value as any)
                  }}
                  // value={(field.state.value as string) || ''}
                  // onOpenChange={(isOpen) => (isOpen ? null : field.handleBlur())}
                  // onValueChange={(value) => field.handleChange(value as any)}
                  // className="border border-black-2 mb-3 p?laceholder:text-[#969a9b]"
                >
                  <SelectTrigger
                    className={`${field.state.value ? '' : 'text-muted-foreground'} mb-3 border  mb-3 placeholder:text-[#969a9b]`}
                  >
                    <SelectValue placeholder="Select Course Area" className="text-[#969a9b]" />
                  </SelectTrigger>
                  <SelectContent>
                    ''
                    {(
                      Companies.fields.find(
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
              >
                Continue {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>

      <p className="font-[400] text-[12px] text-gray-dark-2 leading-[16px] mt-[12px] text-cente r">
        Already have an account ?
        <span
          className="text-[#007AFF] cursor-pointer"
          onClick={() => router.push('/company-auth/login')}
        >
          {' '}
          login as a company
        </span>
      </p>
    </div>
  )
}
