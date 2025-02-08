'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ServiceResponse, ErrorResponse } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'

type Response = {
  message: string
}

export default async function updateUserImage(
  file: File,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  const formData = new FormData()
  formData.append('file', file)

  //todo figure out the user's collection and id; and then call uploadMedia and then updateDoc

  return await axiosInstance
    .post<Response | ErrorResponse>(`/api/media`, formData, {
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
