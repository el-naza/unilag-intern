'use server'

import { CompanyPreLogin } from '@/collections/Companies'
import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'

export default async function sendCompanyOTP(
  // col: CollectionSlug,
  data: CompanyPreLogin,
): Promise<{ message: string; email?: string; emailBlur?: string }> {
  console.log('reset email ' + data)
  return (
    await axiosInstance
      .post(`/api/companies/send-password-reset-otp`, data)
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
