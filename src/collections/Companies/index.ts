import type { CollectionConfig, Where } from 'payload'

import { authenticatedUsers } from '@/access/authenticated-users'
import { self } from '@/access/self'
import { anyone } from '@/access/anyone'
import { parse } from 'qs-esm'
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
      type: 'point',
      required: true,
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
      required: true,
    },
  ],
  endpoints: [
    {
      method: 'get',
      path: '/search',
      handler: async (req) => {
        const { name } = req.query

        if (!name) {
          return Response.json({ message: 'Please enter a valid job name' }, { status: 400 })
        }

        const where: Where = parse(req.query)

        const companyFindRes = await req.payload.find({
          collection: 'companies',
          where,
          showHiddenFields: true,
        })

        return Response.json({ data: companyFindRes }, { status: 200 })
      },
    },
  ],
}
