'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'
import fetchDocs from './fetchDocs'
import { Report } from '@/payload-types'
import { stringify } from 'qs-esm'
import { auth } from '@/auth'

export default async function fetchStudentReports(
  studentId: string | undefined = undefined,
): Promise<Record<string, Report[]>> {
  const stringifiedQuery = stringify(
    {
      limit: Infinity,
      pagination: false,
      where: {
        student: { equals: studentId || (await auth())?.user?.id },
      },
      sort: '-createdAt',
    },
    { addQueryPrefix: true },
  )

  const reports = await fetchDocs<Report>('reports', stringifiedQuery)
  console.log('reports', reports)

  const result = {}
  for (const report of (reports as { docs: Report[] }).docs) {
    if (report?.week?.toString?.())
      result[report?.week?.toString?.()] = [...(result?.[report?.week?.toString?.()] || []), report]
  }

  console.log('result', result)
  return result
}
