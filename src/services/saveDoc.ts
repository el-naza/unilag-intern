'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ErrorResponse, ServiceResponse, ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function saveDoc<T>(
  col: CollectionSlug,
  data: T,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  return await axiosInstance
    .post(`/api/${col}`, data, {
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
