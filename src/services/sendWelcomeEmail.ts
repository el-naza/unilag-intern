'use server'

import { NewStudent } from '@/collections/Students'
import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'

export default async function sendWelcomeEmail(
  // col: CollectionSlug,
  data: NewStudent,
) {
  return (
    await axiosInstance.post(`/api/students/welcome-email`, data).catch((error: AxiosError) => {
      return error.response
    })
  )?.data
}
