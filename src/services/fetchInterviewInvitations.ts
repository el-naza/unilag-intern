'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug, Where } from 'payload'
import { stringify } from 'qs-esm'

type Search = {
  status?: string
}

export default async function fetchInterviewInvitations<T>(
  search: Search,
): Promise<{ data: T } | ValidationErrors> {
  const query: Where = {
    ...(search.status && { status: { equals: search.status } }),
  }

  const stringifiedQuery = stringify(
    {
      where: query,
    },
    { addQueryPrefix: true },
  )

  const col: CollectionSlug = 'interview-invitations'

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
