'use server'

import { StudentPreLogin } from '@/collections/Students'
import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'

export default async function sendStudentOTP(
  // col: CollectionSlug,
  data: StudentPreLogin,
): Promise<{ message: string }> {
  return (
    await axiosInstance
      .post(`/api/students/send-password-reset-otp`, data)
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
