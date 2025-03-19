'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function deleteDoc<T>(
  col: CollectionSlug,
  id: string,
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance
      .delete(`/api/${col}/${id}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NODE_ENV === 'production', req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
