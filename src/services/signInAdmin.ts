'use server'
import { AdminAuthOperations } from '@/payload-types'
import { signIn } from '@/auth'

export default async function signInAdmin(
  // col: CollectionSlug,
  data: AdminAuthOperations['login'],
): Promise<{ message: string }> {
  return await signIn('credentials', {
    ...data,
    col: 'admins',
    redirect: false,
  }).catch((error) => {
    return error
  })
}
