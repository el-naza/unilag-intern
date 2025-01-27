'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { CollectionSlug } from 'payload'

export default async function saveDoc<T>(
  col: CollectionSlug,
  data: T,
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance.post(`/api/${col}`, data).catch((error: AxiosError) => {
      return error.response
    })
  )?.data
}
