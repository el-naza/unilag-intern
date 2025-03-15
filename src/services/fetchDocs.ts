'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function fetchDocs<T>(
  col: CollectionSlug,
): Promise<{ data: T } | ValidationErrors> {
  console.log(
    '*******token getting',
    (await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))
      ?.token!,
  )
  return (
    await axiosInstance
      .get(`/api/${col}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
