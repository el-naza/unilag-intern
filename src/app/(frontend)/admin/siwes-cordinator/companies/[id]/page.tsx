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
import { Textarea } from '@/components/ui/textarea'
import useInitials from '@/custom-hooks/useInitials'
import { getCompany, updateCompany } from '@/services/admin/companies'
import { getAllReports, getEmployments } from '@/services/admin/reports'
import { format, formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import AssignStudent from './assign-student'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ValidationFieldError, Field } from 'payload'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'

export default function CompanyDetailPage() {
  const { id }: { id: string } = useParams()

  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')
  const [company, setCompany] = useState<any>(null)
  const [siwesStudents, setSiwesStudents] = useState<any>(null)
  const [siwesReports, setSiwesReports] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchCompanyDetail = async () => {
    return getCompany('companies', id).then((res: any) => {
      console.log('Company', res.data)
      setCompany(res.data)
      setLoading(false)
    })
  }

  const fetchEmployments = async () => {
    const query = new URLSearchParams({ 'where[company]': id }).toString()
    return getEmployments('employments', query).then((res: any) => {
      console.log('Employments: ', res)
      const { docs } = res.data
      setSiwesStudents(docs)
    })
  }

  const fetchReports = async (params?: string) => {
    return getAllReports('reports', params).then((res: any) => {
      console.log('Reports: ', res)
      const { docs } = res.data
      setSiwesReports(docs)
    })
  }

  useEffect(() => {
    Promise.allSettled([fetchCompanyDetail(), fetchEmployments(), fetchReports()])
  }, [])

  const requiredFields = useMemo(
    () => [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'cac',
        type: 'text',
        required: true,
      },
      {
        name: 'address',
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
        name: 'website',
        type: 'text',
        required: false,
      },
      {
        name: 'description',
        type: 'text',
        required: false,
      },
    ],
    [],
  )

  const form = useForm<any>({
    defaultValues: {
      name: company?.name || '',
      cac: company?.cac || '',
      address: company?.address || '',
      website: company?.website || '',
      email: company?.email || '',
      phone: company?.phone || '',
      description: company?.description || '',
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

        const error = await updateCompanyInfo.mutateAsync(value)

        if (error) {
          return {
            form: error as string,
            fields: {},
          }
        }

        toast.success(`Company updated successfully`)
        return null
      },
    },
  })

  const updateCompanyInfo = useMutation({
    mutationFn: async (payload: any) => {
      try {
        const res = await updateCompany('companies', payload)

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
    <form className="p-8" onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}>
      <h1 className="font-semibold text-[1.5rem]">Company Profile</h1>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-between mt-4 p-8 w-full mb-8 bg-[url(/images/profile-bg.png)] bg-cover bg-no-repeat bg-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={company?.picture} alt="Profile" />
            <AvatarFallback className="bg-white">{useInitials(company?.name)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-[1.2rem] text-white">{company?.name}</h3>
            <p className="text-sm text-white">{company?.cac}</p>
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
            {/* <Button className="bg-gray-light-2 text-black-2">Assigned Student</Button> */}
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Assign Student</DialogTitle>
              <DialogDescription>Assign students to a company</DialogDescription>
            </DialogHeader>

            <AssignStudent companyId={company?.id} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3 className="font-medium text-[1.2rem]">Company Information</h3>
        <p className="text-sm">Company Basic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">Company Name</Label>
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
                      placeholder="Enter company Name"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div>
            <Label className="mt-3 block">CAC Number</Label>
            <form.Field name="cac">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter company cac"
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
            <form.Field name="address">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter address"
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
                      placeholder="Enter company cac"
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
                      placeholder="Enter phone number"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>

          <div>
            <Label className="mt-3 block">Website</Label>
            <form.Field name="website">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter company website"
                      className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                    />
                    <FieldError field={field} />
                  </>
                )
              }}
            </form.Field>
          </div>
        </div>

        <div>
          <Label className="mt-3 block">Description</Label>
          <form.Field name="desctiption">
            {(field) => {
              return (
                <>
                  <Textarea
                    name={field.name}
                    value={field.state.value || ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter company description"
                    className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
                  />
                  <FieldError field={field} />
                </>
              )
            }}
          </form.Field>
        </div>

        <h3 className="font-medium text-[1.2rem] mt-8">Siwes Students</h3>
        <p className="text-sm">Company students</p>

        <div className="mt-4">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {siwesStudents?.map((employment: any, index: number) => (
              <div className="relative inline-block overflow-hidden rounded-md" key={index}>
                <Image
                  src="/images/student-image.jpeg"
                  width={500}
                  height={700}
                  alt="Picture"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 text-white w-full px-3 pb-1 bg-gradient-to-t from-[#00000069] to-[transparent]">
                  <h4>{employment.student.firstName + ' ' + employment.student.lastName}</h4>
                  <p className="flex flex-wrap justify-between items-center text-[.6rem]">
                    <span>{employment.student.course}</span>{' '}
                    <span>
                      {formatDistanceToNow(employment.student.createdAt, { addSuffix: true })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem] mt-8">Siwes Reports</h3>
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
