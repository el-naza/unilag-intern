'use server'

import axiosInstance from '@/utilities/axiosInstance'
import { ValidationErrors } from '@/utilities/types'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'
import { CollectionSlug } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ObjectId } from 'mongodb'

export default async function fetchCoinsAndApplicationsCount(
  studentId: string,
): Promise<{ coins: number; applications: number }> {
  const payload = await getPayload({ config })
  // console.log('Fetching coins and applications count for studentId:', studentId)
  // Single aggregation pipeline combining payments and internship applications totals
  const aggregation = await payload.db.collections['payments'].aggregate(
    [
      { $match: { student: new ObjectId(studentId) } },
      { $group: { _id: null, coins: { $sum: { $multiply: ['$amount', '$rate'] } } } },
      {
        $unionWith: {
          coll: 'internship-applications',
          pipeline: [
            { $match: { student: new ObjectId(studentId) } },
            { $group: { _id: null, applications: { $sum: 1 } } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          coins: { $max: '$coins' },
          applications: { $max: '$applications' },
        },
      },
    ],
    { allowDiskUse: true },
  )

  const coins = (aggregation[0]?.coins || 0) + 3 // add the three (3) free coins
  const applications = aggregation[0]?.applications || 0

  // console.log('Total Coins:', coins)
  // console.log('Internship Applications:', applications)

  return { coins, applications }
}
