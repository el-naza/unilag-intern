'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ErrorResponse, ServiceResponse, ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'
import uploadMedia from './uploadMedia'

export default async function saveDoc<T>(
  col: CollectionSlug,
  data: T,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  const authToken = (
    await getToken({
      secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'),
      req: { headers: await headers() },
      secret: process.env.NEXTAUTH_SECRET,
    })
  )?.token! as string

  // console.log('save doc', col, data)
  // for (let key in data) {
  //   if (data[key] instanceof File) {
  //     // console.log('File found', key, data[key])
  //     const mediaUploadRes = await uploadMedia(data[key], authToken)
  //     // console.log('media upload res', mediaUploadRes)

  //     if (!mediaUploadRes?.data?.doc?.id) return mediaUploadRes

  //     data[key] = mediaUploadRes?.data?.doc?.id!
  //   }
  // }
  for (let key in data) {
    const maybeFile = data[key] as any

    if (
      maybeFile &&
      typeof maybeFile === 'object' &&
      typeof maybeFile.arrayBuffer === 'function' &&
      typeof maybeFile.name === 'string'
    ) {
      const mediaUploadRes = await uploadMedia(maybeFile, authToken)

      if (!mediaUploadRes?.data?.doc?.id) return mediaUploadRes

      data[key] = mediaUploadRes.data.doc.id as any
    }
  }

  // return
  return await axiosInstance
    .post(`/api/${col}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => ({
      success: true,
      status: res?.status,
      data: res?.data,
    }))
    .catch((error: AxiosError) => {
      console.error('save doc err', error?.response?.data)
      if (error.response)
        return {
          status: error.response.status,
          ...(error.response.data as ErrorResponse),
        }
    })
}
