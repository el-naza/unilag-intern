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

export async function getPopularCompanies(
  col: CollectionSlug,
  params?: string,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {

  return await axiosInstance
    .get<Response | ErrorResponse>(`/api/${col}/?${params}`,
)
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
