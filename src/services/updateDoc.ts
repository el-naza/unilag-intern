'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ServiceResponse, ErrorResponse } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

type Response = {
  message: string
}

export default async function updateDoc(
  col: CollectionSlug,
  id: string,
  update: object,
  authToken?: string | undefined,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  console.log(
    '***Token',
    (
      await getToken({
        secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'),
        req: { headers: await headers() },
        secret: process.env.NEXTAUTH_SECRET,
      })
    )?.token!,
  )
  return await axiosInstance
    .patch<Response | ErrorResponse>(`/api/${col}/${id}`, update, {
      headers: {
        Authorization: `Bearer ${authToken || (await getToken({ secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'), req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
      },
    })
    .catch((error: AxiosError) => {
      if (error.response)
        return {
          status: error.response.status,
          data: error.response.data as ErrorResponse,
        }
    })
    .then((res) => ({
      success: true,
      status: res?.status,
      data: res?.data,
    }))
}
