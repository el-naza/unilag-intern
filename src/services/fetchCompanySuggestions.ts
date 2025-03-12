'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'

export default async function fetchCompanySuggestions<T>({
  companyId,
}: {
  companyId: string
}): Promise<{ data: T } | ValidationErrors> {
  return (
    await axiosInstance
      .get(`/api/companies/suggestions?companyId=${companyId}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
