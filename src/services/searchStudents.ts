'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug, Where } from 'payload'
import { stringify } from 'qs-esm'

type StudentSearch = {
  internshipType?: string
  gender?: string
  matricNo?: string
  nationality?: string
}

export default async function searchStudents<T>(
  search: StudentSearch,
): Promise<{ data: T } | ValidationErrors> {
  const query: Where = {
    ...(search.internshipType && {
      internshipType: {
        in: search.internshipType.split(','), 
      },
    }),
    ...(search.gender && { gender: { equals: search.gender } }),
    ...(search.matricNo && { matricNo: { equals: search.matricNo } }),
    ...(search.nationality && { nationality: { like: search.nationality } }),
  };
  
  const stringifiedQuery = stringify(
    {
      where: query,
    },
    { addQueryPrefix: true },
  )

  const col: CollectionSlug = 'students'

  return (
    await axiosInstance
      .get(`/api/${col}${stringifiedQuery}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
