'use client'
import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Image from 'next/image'
import { parse, formatISO } from 'date-fns'
import ArrowIcon from '../../../../assets/icons/arrow'
import NavBar from '../../../../common/nav-bar'
import studentImage from '../../../../assets/images/student-image.png'
import MailIcon from '../../../../assets/icons/mail'
import Calendar from '../../../../components/Ui/calendar'
import fetchDoc from '@/services/fetchDoc'
import saveDoc from '@/services/saveDoc'
import { useForm } from '@tanstack/react-form'
import { InterviewInvitation } from '@/payload-types'
import { InterviewInvitations } from '@/collections/InterviewInvitations'
import { ValidationErrors } from '@/utilities/types'
import { Field, ValidationFieldError } from 'payload'
import FormError from '@/components/FormError'
import FieldError from '@/components/FieldError'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'
import updateDoc from '@/services/updateDoc'

interface StudentDetail {
  id: string
  image: {
    url: string
  }
}

export default function StudentInvitation() {
  const router = useRouter()
  const { id: studentId }: { id: string } = useParams()
  const { data: session } = useSession()

  const [student, setStudent] = useState<StudentDetail>()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const user = useMemo<any>(() => session?.user, [session])

  const dates = ['07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm']

  const fetchStudent = async () => {
    const res: any = await fetchDoc('students', studentId)
    console.log('student', res)
    setStudent(res)
  }

  const sendInvitationMtn = useMutation({
    mutationFn: async (invitation: InterviewInvitation) => {
      try {
        setLoading(true)
        // const updateApplication = await updateDoc('internship-applications', id, { status })

        const res = await saveDoc('interview-invitations', invitation)
        if (!res) return toast.error('Network error; please try again later')
        return res
      } catch {
        toast.error('An error occurred while saving the message; please try again later')
      } finally {
        setLoading(false)
      }
    },
  })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const form = useForm<InterviewInvitation>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        value.student = studentId
        value.company = user?.id
        value.message = value.message
        value.dateTime =
          selectedDate && selectedTime
            ? formatISO(parse(selectedTime, 'hh:mm a', selectedDate))
            : ''

        //  if (!value.dateTime) {
        //    return {
        //      form: 'Please select a date and time for the interview.',
        //    }
        //  }

        const emptyRequiredFields = InterviewInvitations.fields.reduce<object>(
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

        const res = await sendInvitationMtn.mutateAsync(value)
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

        form.reset()
        toast.success('Invitation successful')
        //  setOpen(true)

        return null
      },
    },
  })

  useEffect(() => {
    fetchStudent()
  }, [])

  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar fill="#0B7077" />
      </nav>
      <div className="max-w-[866px] m-auto lg:mt-[58px]">
        <button
          className="flex items-center gap-[4px] font-[400] text-[14px] p-[24px] lg:p-0"
          onClick={() => router.back()}
        >
          <ArrowIcon />
          Back
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="p-[24px] flex items-start flex-col gap-5 lg:flex-row ">
            <div className="max-w-[250px]">
              <Image
                src={student?.image?.url || studentImage}
                alt="image"
                width={0}
                height={300}
                className="h-[300px] object-cover rounded  lg:w-[250px] w-[250px]"
              />

              {/* <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <> */}
              <Button
                type="button"
                size="lg"
                onClick={() => router.push(`/company-pages/student-details/${studentId}`)}
                className="w-full rounded p-3 bg-[#0B7077] text-white text-center mt-[24px]"
              >
                {/* <MailIcon fill="#FFFFFF" />  */}
                View Profile
              </Button>
              {/* </>
                )}
              </form.Subscribe> */}

              {/* <button
                type="submit"
                className="mt-[24px] w-full py-[12px] rounded-[6px] bg-[#0B7077] flex items-center justify-center gap-[8px] font-[500] text-[16px] text-[#FFFFFF]"
              >
                <MailIcon fill="#FFFFFF" /> Send Invitation
              </button> */}
            </div>
            <div className="lg:w-[568px]">
              <h3 className="font-[400] text-[14px]">Invitation Message</h3>
              <form.Field name="message">
                {(field) => (
                  <>
                    <textarea
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write a Message"
                      className="bg-white p-[12px] h-[120px] border w-full"
                      rows={5}
                    />
                    <FieldError field={field} />
                  </>
                )}
              </form.Field>

              <form.Field name="dateTime">
                {(field) => (
                  <>
                    <div className="mt-[12px]">
                      <Calendar
                        selectedDate={selectedDate || new Date()}
                        onDateSelect={handleDateSelect}
                      />
                    </div>
                    <FieldError field={field} />
                  </>
                )}
              </form.Field>

              {/* Time Selection */}
              <form.Field name="dateTime">
                {(field) => (
                  <>
                    <div className="mt-[12px]">
                      <p className="font-[400] text-[14px]">Select Time</p>
                      <div className="mt-[6px] bg-[#FFFFFF] rounded-[4px] p-[6px] w-full flex gap-2 flex-wrap">
                        {dates.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`px-[12px] py-[6px] text-[14px] rounded-[4px] ${selectedTime === time ? 'bg-[#0B7077] text-white' : 'bg-gray-200'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <FieldError field={field} />
                  </>
                )}
              </form.Field>

              <div></div>

              <p className="text-[#FF9500] font-[400] text-[12px] my-[12px]">
                Confirm your invitation before sending. The recipient will be notified once you
                proceed.
              </p>

              {/* <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => ( */}
              <div className='mb-[100px]'>
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full rounded p-3 bg-[#0B7077] text-white text-center mt-[24px] "
                >
                  Send Application {loading && <Spinner />}
                </Button>
                <FormError form={form} />
              </div>
              {/* )}
              </form.Subscribe> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
