'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'

export default async function signInUser(credentials) {
  const { username, password, col, email }: any = credentials

  return await axiosInstance
    .post(`/api/${col}/login`, {
      username,
      password,
      email,
    })
    .catch((err: AxiosError) => err.response)
}
