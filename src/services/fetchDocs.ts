'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { CollectionSlug } from 'payload'

export default async function fetchDocs<T>(
  col: CollectionSlug,
): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance.get(`/api/${col}`).catch((error: AxiosError) => {
      return error.response
    })
  )?.data
}
