import type { CollectionConfig } from 'payload'

import { authenticatedUsers } from '@/access/authenticated-users'
import { self } from '@/access/self'
import { anyone } from '@/access/anyone'
import { NextResponse as Response } from 'next/server'
import { z } from 'zod'

const PreLogin = z.object({
  matricNo: z.string(),
})

type PreLogin = z.infer<typeof PreLogin>

// test pre-login to check whether user has set password
// test forgot password reset with otp endpoints

export const Students: CollectionConfig = {
  slug: 'students',
  access: {
    create: anyone,
    delete: self,
    read: authenticatedUsers,
    update: self,
  },
  auth: {
    loginWithUsername: true,
  },
  hooks: {
    beforeOperation: [
      async ({ args, req }) => {
        // in order to login with matric no. as the username thru REST API
        if (req.data?.matricNo) args.data.username = req.data?.matricNo
        return args
      },
    ],
  },
  endpoints: [
    {
      method: 'post',
      path: '/pre-login',
      handler: async (req) => {
        const { data } = PreLogin.safeParse(await req.json?.())

        if (!data) {
          return Response.json({ message: 'matric no. not specified' }, { status: 400 })
        }

        const studentFindRes = await req.payload.find({
          collection: 'students',
          where: {
            matricNo: { equals: (data as any).matricNo },
          },
        })

        if (studentFindRes.docs.length === 0) {
          return Response.json(
            { message: 'This matric no. has not been registered yet' },
            { status: 404 },
          )
        }

        const { hasSetPassword } = studentFindRes.docs[0]

        return Response.json({
          message: `User has ${hasSetPassword ? '' : 'not'} set password`,
          ready: !!hasSetPassword,
        })
      },
    },
  ],
  fields: [
    {
      name: 'firstName',
      type: 'text',
      minLength: 1,
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'middleName',
      type: 'text',
    },
    {
      name: 'username',
      type: 'text',
      hidden: true,
    },
    {
      name: 'matricNo',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'hasSetPassword',
      type: 'checkbox',
      defaultValue: false,
      hidden: true,
    },
    {
      name: 'dob',
      type: 'date',
      required: true,
    },
    {
      name: 'nationality',
      type: 'text',
      required: true,
    },
    {
      name: 'stateOfOrigin',
      type: 'text',
      required: true,
    },
    {
      name: 'homeAddress',
      type: 'text',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      options: ['MALE', 'FEMALE'],
      required: true,
    },
    {
      name: 'course',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'text',
      required: true,
      // options: ['100', '200', '300', '400', '500', '600', '700'],
    },
    {
      name: 'internshipType',
      type: 'select',
      required: true,
      options: ['SIWES', 'TEACHING PRACTICE'],
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bankCode',
      type: 'text',
    },
    {
      name: 'bankName',
      type: 'text',
    },
    {
      name: 'accountNo',
      type: 'text',
    },
  ],
}
