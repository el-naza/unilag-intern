'use server'

import { auth } from '@/auth'
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
  token = '',
  params = {},
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance
      .get(`/api/${col}${where}`, {
        params,
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'), req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token! || token}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
