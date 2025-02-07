'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { CollectionSlug } from 'payload'

export default async function fetchDoc<T>(
  col: CollectionSlug,
  id: string,
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance.get(`/api/${col}/${id}`).catch((error: AxiosError) => {
      return error.response
    })
  )?.data
}
