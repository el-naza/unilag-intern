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

export default async function updateProfileImage(
  col: CollectionSlug,
  id: string,
  update: object,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  console.log(
    '***Token',
    (await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))
      ?.token!,
  )
  return await axiosInstance
    .patch<Response | ErrorResponse>(`/api/${col}/${id}`, update, {
      headers: {
        Authorization: `Bearer ${(await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
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
