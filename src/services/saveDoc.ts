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
  // console.log('save doc', col, data)
  return await axiosInstance
    .post(`/api/${col}`, data, {
      headers: {
        Authorization: `Bearer ${(await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
      },
    })
    .then((res) => ({
      success: true,
      status: res?.status,
      data: res?.data,
    }))
    .catch((error: AxiosError) => {
      console.error('save doc err', error?.response?.data)
      if (error.response)
        return {
          status: error.response.status,
          ...(error.response.data as ErrorResponse),
        }
    })
}
