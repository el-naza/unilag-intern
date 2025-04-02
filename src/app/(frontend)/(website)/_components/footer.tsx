'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import './footer.scss'
import FormError from '@/components/FormError'
import { useMutation } from '@tanstack/react-query'
import { EmailSubscriber } from '@/payload-types'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import saveDoc from '@/services/saveDoc'
import { EmailSubscribers } from '@/collections/EmailSubscribers'
import { Field, ValidationFieldError } from 'payload'
import { ValidationErrors } from '@/utilities/types'
import Spinner from '@/components/spinner'
import FieldError from '@/components/FieldError'

const Footer = () => {
  const saveSubscriberMtn = useMutation({
    mutationFn: async ({ email }: EmailSubscriber) => {
      try {
        const res = await saveDoc('email-subscribers', { email })
        if (!res) return toast.error('Network err; pls try again later')

        return res
      } catch {
        toast.error('An error occured while saving message; pls try again later')
      }
    },
  })

  const form = useForm<EmailSubscriber>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        const emptyRequiredFields = EmailSubscribers.fields.reduce<object>(
          (acc: ValidationFieldError, field: Field & { required: boolean; name: string }) => ({
            ...acc,
            ...(field?.required && !value[field.name] && { [field.name]: 'Required!' }),
          }),
          {},
        )

        if (Object.keys(emptyRequiredFields).length) {
          return {
            form: 'Some required fields are missing. Please fill out all mandatory fields to proceed.',
            fields: emptyRequiredFields,
          }
        }

        // const error = await saveSubscriberMtn.mutateAsync(value)
        const res = await saveSubscriberMtn.mutateAsync(value)
        if ((res as ValidationErrors)?.errors?.[0]?.data?.errors?.length) {
          if ((res as ValidationErrors).errors[0].data.errors[0].message.includes('unique')) {
            toast.error('Email already subscribed')
            return {
              form: 'Email already subscribed',
              fields: { email: '' },
            }
          }

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

        // success here so naviagate or toast to success !!
        form.reset()
        toast.success('Your email has been saved successfully')
        // router.push('/student')

        return null
      },
    },
  })

  return (
    <footer className="grid grid-cols-12 justify-evenly gap-8 bg-[#D2E6E4] text-primary pb-16 pt-24 px-24 text-[14px] w-full curved-top">
      <div className="lg:col-span-1 sm:col-span-3">
        <Image src={'/images/unilag-logo.png'} alt="Logo" width={60} height={100} />
      </div>

      <div className="lg:col-span-3 sm:col-span-5">
        <ul className="space-y-2">
          <li>
            <strong>Address:</strong> University of Lagos, University Road, Lagos Mainland, Akoka,
            Yaba, Lagos, Nigeria.
          </li>
          <li>
            Tel: <a href="tel:+23498720938">+23498720938</a>
          </li>
          <li>Response Hours: 8am to 5pm</li>
          <li>Email: help@intrns.com</li>
        </ul>
      </div>

      <div className="lg:col-span-2 sm:col-span-4">
        <p className="text-black font-semibold">Intern Categories</p>
        <ul className="space-y-2">
          <li>
            <Link href={'/company-pages/home?internshipType=SIWES'}>SIWES</Link>
          </li>
          <li>
            <Link href={'/company-pages/home?internshipType=TEACHING PRACTICE'}>
              Teaching Practice
            </Link>
          </li>
          <li>
            <Link href={'/company-pages/home?internshipType=HOUSEMANSHIP'}>Housemanship</Link>
          </li>
          <li>
            <Link href={'/company-pages/home?internshipType=OTHERS'}>Others</Link>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-2 sm:col-span-3">
        <p className="text-black font-semibold">Links</p>
        <ul className="space-y-2">
          <li>
            <Link href="/auth/login">Log in to Students Dashboard</Link>
          </li>
          <li>
            <Link href="/company-auth/login">Log in to Company Dashboard</Link>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-3 sm:col-span-6">
        <label htmlFor="email">Stay up to date with the latest course</label>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="w-full max-w-sm"
        >
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2 bg-white p-2 rounded-[14px]">
            <form.Field name="email">
              {(field) => {
                return (
                  <>
                    <Input
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Email"
                      className="border-0 outline-none"
                    />
                    <FieldError field={field} className="" />
                  </>
                )
              }}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="bg-primary text-white rounded-[12px]"
                  >
                    Send {isSubmitting && <Spinner />}
                  </Button>

                  {/* <FormError form={form} /> */}
                </>
              )}
            </form.Subscribe>
            {/* <Input type="email" placeholder="Email" className="border-0 outline-none" /> */}
            {/* <Button type="submit" className="bg-primary text-white rounded-[12px]">
                  Send
                </Button> */}
          </div>
        </form>
        <FormError form={form} />
      </div>
    </footer>
  )
}

export default Footer
