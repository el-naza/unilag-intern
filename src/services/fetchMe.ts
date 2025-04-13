'use server'

import { Admin, Company, DepartmentalCoordinator, Student } from '@/payload-types'
import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function fetchMe<T>(
  col: CollectionSlug,
): Promise<{ user: Student | Company | Admin | DepartmentalCoordinator } | ValidationErrors> {
  return (
    await axiosInstance
      .get(`/api/${col}/me`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'), req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
