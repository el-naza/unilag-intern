'use server'

import { CompanyPreLogin } from '@/collections/Companies';
import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'

export default async function verifyCompanyOTP(
  // col: CollectionSlug,
  data: CompanyPreLogin & { otp: string },
): Promise<{ message: string; token?: string }> {
  return (
    await axiosInstance
      .post(`/api/companies/verify-password-reset-otp`, data)
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
