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

export const companies: CollectionConfig = {
  slug: 'companies',
  access: {
    create: anyone,
    delete: self,
    read: authenticatedUsers,
    update: self,
  },
  auth: {
    loginWithUsername: false,
  },
  hooks: {
    beforeOperation: [
      async ({ args, req }) => {
        // in order to login with matric no. as the username thru REST API
        // if (req.data?.matricNo) args.data.username = req.data?.matricNo
        return args
      },
    ],
  },

  fields: [
    {
      name: 'companyName',
      type: 'text',
      minLength: 1,
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'ripCode',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
}
