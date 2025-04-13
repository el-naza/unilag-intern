'use server'

import { Company } from '@/payload-types'
import axiosInstance from '@/utilities/axiosInstance'
import { ErrorResponse, ServiceResponse } from '@/utilities/types'
import { AxiosError } from 'axios'
import { CollectionSlug } from 'payload'

type Response = {
  message: string
  docs: Company[]
}

export async function getPopularCompanies(
  col: CollectionSlug,
  params?: any,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  return await axiosInstance
    .get<Response | ErrorResponse>(`/api/${col}/?${params}`)
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
