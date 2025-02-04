import type { CollectionConfig } from 'payload'

import { authenticatedUsers } from '@/access/authenticated-users'
import { self } from '@/access/self'
import { anyone } from '@/access/anyone'
// import { NextResponse as Response } from 'next/server'
// import { z } from 'zod'

// const PreLogin = z.object({
//   email: z.string().email(),
// })

// type PreLogin = z.infer<typeof PreLogin>

// test pre-login to check whether user has set password
// test forgot password reset with otp endpoints

export const Companies: CollectionConfig = {
  slug: 'companies',
  access: {
    create: anyone,
    delete: self,
    read: anyone,
    update: anyone,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 1,
      required: true,
    },
    {
      name: 'cac',
      type: 'text',
      required: true,
    },
    {
      name: 'courseAreas',
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'phone',
      required: true,
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
  ],
}
