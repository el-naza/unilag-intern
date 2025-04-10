'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function fetchDoc<T>(
  col: CollectionSlug,
  id: string,
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance
      .get(`/api/${col}/${id}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'), req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
