'use server'

import { StudentPreLogin } from '@/collections/Students'
import { StudentAuthOperations } from '@/payload-types'
import axiosInstance from '@/utilities/axiosInstance'
import { signIn } from '@/auth'
import { AxiosError } from 'axios'
// import { signIn } from 'next-auth/react'

export default async function signInStudent(
  // col: CollectionSlug,
  data: StudentAuthOperations['login'],
): Promise<{ message: string }> {
  return await signIn('credentials', {
    ...data,
    col: 'students',
    redirect: false,
  }).catch((error) => {
    return error
  })
}
