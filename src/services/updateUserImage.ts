'use server'

import { ServiceResponse, ErrorResponse } from '@/utilities/types'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import uploadMedia from './uploadMedia'
import updateDoc from './updateDoc'
import { CollectionSlug } from 'payload'

type Response = {
  message: string
}

export default async function updateUserImage(
  col: CollectionSlug,
  userId: string,
  file: File,
  authToken: string | undefined,
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  if (!authToken)
    return {
      status: 401,
      data: { message: 'No auth token supplied' },
    }

  const mediaUploadRes = await uploadMedia(
    file,
    authToken ||
      ((await getToken({ req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))
        ?.token! as string),
  )

  console.log('media upload res', mediaUploadRes)
  if (!mediaUploadRes?.data?.doc?.id) return mediaUploadRes

  return await updateDoc(
    col,
    userId,
    {
      image: mediaUploadRes?.data?.doc?.id!,
    },
    authToken,
  )
}
