'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ServiceResponse, ErrorResponse } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'

type Response = {
  message: string
}

export async function getAllStudents(
  col: CollectionSlug,
  params?: string
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  
  const authResult = await getToken({
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  return await axiosInstance
    .get<Response | ErrorResponse>(`/api/${col}/?${params}`, {
      headers: {
        Authorization: `Bearer ${authResult?.token}`,
      },
    })
    .catch((error: AxiosError) => {
      if (error.response)
        return {
          status: error.response.status,
          data: error.response.data as ErrorResponse,
        }
    })
    .then((res) => ({
      success: true,
      status: res?.status,
      data: res?.data,
    }))
}

export async function getStudent(
  col: CollectionSlug,
  studentId: string
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  
  const authResult = await getToken({
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  return await axiosInstance
    .get<Response | ErrorResponse>(`/api/${col}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${authResult?.token}`,
      },
    })
    .catch((error: AxiosError) => {
      if (error.response)
        return {
          status: error.response.status,
          data: error.response.data as ErrorResponse,
        }
    })
    .then((res) => ({
      success: true,
      status: res?.status,
      data: res?.data,
    }))
}

export async function deleteStudent(
  col: CollectionSlug,
  studentId: string
): Promise<ServiceResponse<Response | ErrorResponse> | undefined> {
  
  const authResult = await getToken({
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  return await axiosInstance
    .delete<Response | ErrorResponse>(`/api/${col}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${authResult?.token}`,
      },
    })
    .catch((error: AxiosError) => {
      if (error.response)
        return {
          status: error.response.status,
          data: error.response.data as ErrorResponse,
        }
    })
    .then((res) => ({
      success: true,
      status: res?.status,
      data: res?.data,
    }))
}

