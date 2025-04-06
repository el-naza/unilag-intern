'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

export default async function studentPreLogin<T>(
  // col: CollectionSlug,
  data: T,
): Promise<{ ready?: boolean; message: string }> {
  return (
    await axiosInstance.post(`/api/students/pre-login`, data).catch((error: AxiosError) => {
      return error.response
    })
  )?.data
}
