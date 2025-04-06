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
    .then((res) => {
      const data = JSON.stringify(res.data)
      console.log('data ' + data)
      console.log('response ' + res)
      return res
    })
    .catch((err: AxiosError) => err.response)
}

export async function signInUserClient(credentials) {
  return (await signInUser(credentials))?.data
}
