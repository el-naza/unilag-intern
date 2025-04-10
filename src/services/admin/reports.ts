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

export async function getAllReports(
  col: CollectionSlug,
  params?: string,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  const authResult = await getToken({
    secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'),
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  return await axiosInstance
    .get<Response | ErrorResponse>(`/api/${col}/?${params}`, {
      headers: {
        Authorization: `Bearer ${authResult?.token}`,
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

export async function getEmployments(
  col: CollectionSlug,
  params?: string,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  const authResult = await getToken({
    secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'),
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  return await axiosInstance
    .get<Response | ErrorResponse>(`/api/${col}/?${params}`, {
      headers: {
        Authorization: `Bearer ${authResult?.token}`,
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
