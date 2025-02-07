import type { CollectionConfig } from 'payload'

import { authenticatedUsers } from '@/access/authenticated-users'
import { self } from '@/access/self'
import { anyone } from '@/access/anyone'
import { generateEmailHTML } from '../../utilities/generateEmail'
import { NextResponse as Response } from 'next/server'
import * as otpGenerator from 'otp-generator'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { isBefore } from 'date-fns'


const PreLogin = z.object({
  email: z.string().email(),
})

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
  auth: {
    forgotPassword: {
      generateEmailHTML,
    },
  },
  endpoints: [
    {
      method: 'post',
      path: '/pre-login',
      handler: async (req) => {
        const { data } = PreLogin.safeParse(await req.json?.())

        if (!data) {
          return Response.json({ message: 'Company email not specified' }, { status: 400 })
        }

        const companyFindRes = await req.payload.find({
          collection: 'companies',
          where: {
            email: { equals: (data as any).email },
          },
          showHiddenFields: true,
        })

        if (companyFindRes.docs.length === 0) {
          return Response.json(
            { message: 'This email. has not been registered' },
            { status: 404 },
          )
        }

        const { hasSetPassword } = companyFindRes.docs[0]

        return Response.json({
          message: `You password has${hasSetPassword ? ' ' : ' not '}been set`,
          ready: !!hasSetPassword,
        })
      },
    },
    {
      method: 'post',
      path: '/send-password-reset-otp',
      handler: async (req) => {
        const { data } = PreLogin.safeParse(await req.json?.())

        if (!data) {
          return Response.json({ message: 'Matric no. not specified' }, { status: 400 })
        }

        // gen otp and add to context for use in the html gen
        req.context.otp = otpGenerator.generate(
          (process.env.OTP_LENGTH as unknown as number) || 6,
          {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          },
        ) as string

        let res = await req.payload.forgotPassword({
          collection: 'companies',
          data: {
            email: data!.email,
          } as any,
          req: req,
        })

        console.log('forgot password res', res)

        if (!res) {
          return Response.json(
            { message: 'This company. has not been registered' },
            { status: 404 },
          )
        }

        const updateRes = await req.payload.update({
          collection: 'companies',
          where: {
            email: {
              equals: data!.email,
            },
          },
          data: {
            resetPasswordOtpHash: await bcrypt.hash(
              req.context.otp as string,
              Number(process.env.BCRYPT_SALT) || 4,
            ),
          } as any,
          req: req,
        })

        return Response.json({
          message: 'Success',
          email: updateRes.docs[0].email,
          // emailBlur: blurEmail(updateRes.docs[0].email),
        })
      },
    },
    {
      method: 'post',
      path: '/verify-password-reset-otp',
      handler: async (req) => {
        const { matricNo, otp } = await req.json?.()

        if (!matricNo || !otp) {
          return Response.json({ message: 'email and otp must be specified' }, { status: 400 })
        }

        const companyFindRes = await req.payload.find({
          collection: 'students',
          where: {
            matricNo: { equals: matricNo },
          },
          showHiddenFields: true,
        })

        if (companyFindRes.docs.length === 0) {
          return Response.json(
            { message: 'This matric no. has not been registered' },
            { status: 404 },
          )
        }

        const { resetPasswordOtpHash, resetPasswordToken, resetPasswordExpiration, id } =
          companyFindRes.docs[0]

        console.log('matric no', matricNo, resetPasswordToken)

        if (!resetPasswordToken || !resetPasswordExpiration) {
          return Response.json({ message: 'Password reset not started.' }, { status: 400 })
        }

        if (isBefore(resetPasswordExpiration!, new Date())) {
          return Response.json({ message: 'OTP Expired.' }, { status: 400 })
        }

        if (!(await bcrypt.compare(otp, resetPasswordOtpHash!))) {
          return Response.json({ message: 'Invalid OTP.' }, { status: 400 })
        }

        // req.payload.update({
        //   collection: 'students',
        //   id,
        //   data: {
        //     resetPasswordOtpHash: null,
        //   },
        // })

        return Response.json({
          message: 'Success',
          token: resetPasswordToken,
        })
      },
    },
  ],
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
      name: 'email',
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
    {
      name: 'resetPasswordOtpHash',
      type: 'text',
      hidden: true,
    },
  ],
}
