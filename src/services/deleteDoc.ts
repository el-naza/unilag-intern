'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function deleteDoc<T>(
  col: CollectionSlug,
  where: string = '',
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance
      .delete(`/api/${col}${where}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'), req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .then((res) => {
        // console.log('*****res', res)
        return res
      })
      .catch((error: AxiosError) => {
        // console.log('*****err', error, '\n\n*** err res', error.response)
        // return res
        return error.response
      })
  )?.data
}
