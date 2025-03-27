'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug, Where } from 'payload'
import { stringify } from 'qs-esm'

export default async function fetchDocs<T>(
  col: CollectionSlug,
  where: string = '',
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance
      .get(`/api/${col}${where}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NODE_ENV === 'production', req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
