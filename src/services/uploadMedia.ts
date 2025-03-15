'use server'

import { Media } from '@/payload-types'
import axiosInstance from '@/utilities/axiosInstance'
import { ServiceResponse, ErrorResponse } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'

type Response = {
  message: string
  doc: Media
}

export default async function uploadMedia(
  file: File,
  authToken?: string | undefined,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  const formData = new FormData()
  formData.append('file', file)

  return await axiosInstance
    .post<Response | ErrorResponse>(`/api/media`, formData, {
      headers: {
        Authorization: `Bearer ${authToken || (await getToken({ secureCookie: process.env.NODE_ENV === 'production', req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
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
