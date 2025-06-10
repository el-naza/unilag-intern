'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug, Where } from 'payload'
import { stringify } from 'qs-esm'

type Search = {
  name?: string
  address?: string
  currentLocation?: {
    latitude: number
    longitude: number
  }
  distance: number // distance in km
}

export default async function searchJobs<T>(
  search: Search,
): Promise<{ data: T } | ValidationErrors> {
  search.currentLocation = search.currentLocation || {
    // set lagos as default location
    longitude: 3.3792,
    latitude: 6.5244,
  }
  let abjLocation = {
    longitude: 7.49508,
    latitude: 9.05785,
  }

  // convert distance from km to lng_lat degrees
  search.distance = search.distance / 111.32

  console.log('Searching jobs with parameters:', search)

  const query: Where = {
    and: [
      {
        or: [
          ...(search.name ? [{ name: { like: search.name } }] : []),
          ...(search.address ? [{ address: { like: search.address } }] : []),
        ],
      },
      {
        'location.longitude': {
          greater_than_equal: search.currentLocation.longitude - search.distance,
        },
      },
      {
        'location.longitude': {
          less_than_equal: search.currentLocation.longitude + search.distance,
        },
      },
      {
        'location.latitude': {
          greater_than_equal: search.currentLocation.latitude - search.distance,
        },
      },
      {
        'location.latitude': {
          less_than_equal: search.currentLocation.latitude + search.distance,
        },
      },
    ],
  }

  const stringifiedQuery = stringify(
    {
      where: query,
    },
    { addQueryPrefix: true },
  )

  const col: CollectionSlug = 'companies'
  return (
    await axiosInstance
      .get(`/api/${col}${stringifiedQuery}`, {
        headers: {
          Authorization: `Bearer ${(await getToken({ secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'), req: { headers: await headers() }, secret: process.env.NEXTAUTH_SECRET }))?.token!}`,
        },
      })
      .catch((error: AxiosError) => {
        return error.response
      })
  )?.data
}
