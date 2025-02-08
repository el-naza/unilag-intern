'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ServiceResponse, ErrorResponse } from '@/utilities/types'
import { AxiosError } from 'axios'
import { CollectionSlug } from 'payload'

type Response = {
  message: string
  token?: string
}

export default async function resetPassword(
  col: CollectionSlug,
  password: string,
  token: string,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  return await axiosInstance
    .post<Response | ErrorResponse>(`/api/${col}/reset-password`, {
      password,
      token,
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
