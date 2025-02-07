'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function companyPreLogin<T>(
  // col: CollectionSlug,
  data: T,
): Promise<{ ready?: boolean; message: string }> {
  console.log(
    '***Token',
    (await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))
      ?.token!,
  )
  return (
    await axiosInstance.post(`/api/companies/pre-login`, data).catch((error: AxiosError) => {
      return error.response
    })
  )?.data
}
