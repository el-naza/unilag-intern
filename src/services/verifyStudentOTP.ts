'use server'

import { StudentPreLogin } from '@/collections/Students'
import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'

export default async function verifyStudentOTP(
  // col: CollectionSlug,
  data: StudentPreLogin & { otp: string },
): Promise<{ message: string; token?: string }> {
  return (
    await axiosInstance
      .post(`/api/students/verify-password-reset-otp`, data)
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
