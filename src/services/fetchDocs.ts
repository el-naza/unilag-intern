'use server'

import { auth } from '@/auth'
import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug, Where } from 'payload'
import { stringify } from 'qs-esm'

export default async function fetchDocs<T>(
  col: CollectionSlug,
  where: string = '',
  token = '',
): Promise<{ data: T } | ValidationErrors> {
  // console.log( 'auth' , await auth())
  console.log(
    '*******token getting',
    'auth',
    (await headers()).get('authorization'),
    'cookie',
    (await headers()).get('cookie'),
    '\ntoken\n',
    (
      await getToken({
        secureCookie: process.env.NODE_ENV === 'production',
        req: { headers: await headers() },
        secret: process.env.NEXTAUTH_SECRET,
      })
    )?.token!,
  )

  console.log(
    '\ngettting',
    await getToken({
      secureCookie: process.env.NODE_ENV === 'production',
      req: { headers: await headers() },
      secret: process.env.NEXTAUTH_SECRET,
    }),
  )
  return (
    await axiosInstance
      .get(`/api/${col}${where}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NODE_ENV === 'production', req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token! || token}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
