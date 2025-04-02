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
    <footer className="bg-[#D2E6E4] text-primary w-full curved-top px-4 sm:px-6 xl:px-8 lg:px-24 py-12 xl:pt-24 xl:pb-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-2 xl:mx-5">
          {/* Logo */}
          <div className="flex justify-center xl:justify-start xl:ml-5">
            <Image
              src={'/images/unilag-logo.png'}
              alt="Logo"
              width={100}
              height={100}
              className="w-[60px] h-[55px]"
            />
          </div>

          {/* Address */}
          <div className="text-center xl:text-left xl:-ml-32">
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 xl:mb-5 flex-shrink-0"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  <strong>Address:</strong> University of Lagos, University Road, Lagos Mainland,
                  Akoka, Yaba, Lagos, Nigeria.
                </span>
              </li>
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Tel:{' '}
                <a href="tel:+23498720938" className="hover:underline">
                  +23498720938
                </a>
              </li>
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Response Hours: 8am to 5pm
              </li>
              <li className="flex items-center justify-center xl:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 flex-shrink-0"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email: help@intrns.com
              </li>
            </ul>
          </div>

          {/* Intern Categories */}
          <div className="text-center xl:text-left mt-5 xl:mt-0 xl:ml-2">
            <p className="text-black font-semibold mb-2">Intern Categories</p>
            <ul className="space-y-2 text-sm lg:text-[14px]">
              <li>SIWES</li>
              <li>Teaching Practice</li>
              <li>Housemanship</li>
              <li>Others</li>
            </ul>
          </div>

          {/* Links */}
          <div className="text-center xl:text-left mt-5 xl:mt-0 xl:-ml-10 text-wrap max-2xl:w-[200px]">
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

          {/* Newsletter */}
          <div className="flex flex-col items-center xl:items-start xl:-ml-20">
            <p className="text-primary xl:text-sm font-normal mb-2 mt-5 xl:mt-0 text-center xl:text-left">
              Stay up to date with the latest information
            </p>
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
        </div>
      </div>
    </footer>
  )
}

export default Footer

const Footer2 = () => {
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
    <footer className="grid grid-cols-12 max-md:grid-rows-5 justify-evenly gap-8 bg-[#D2E6E4] text-primary pb-16 pt-24 md:px-24 text-[14px] w-full curved-top">
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
