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

export type CompanyPreLogin = z.infer<typeof PreLogin>

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
          return Response.json({ message: 'This email. has not been registered' }, { status: 404 })
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
          return Response.json({ message: 'Email. not specified' }, { status: 400 })
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
        const { email, otp } = await req.json?.()

        if (!email || !otp) {
          return Response.json({ message: 'email and otp must be specified' }, { status: 400 })
        }

        const companyFindRes = await req.payload.find({
          collection: 'companies',
          where: {
            email: { equals: email },
          },
          showHiddenFields: true,
        })

        if (companyFindRes.docs.length === 0) {
          return Response.json({ message: 'This email has not been registered' }, { status: 404 })
        }

        const { resetPasswordOtpHash, resetPasswordToken, resetPasswordExpiration, id } =
          companyFindRes.docs[0]

        console.log('Email', email, resetPasswordToken)

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
    {
      method: 'post',
      path: '/reset-password',
      handler: async (req) => {
        const { password, token } = await req.json?.()
        console.log('***called here')

        if (!password || !token) {
          return Response.json({ message: 'password and token must be specified' }, { status: 400 })
        }

        await req.payload.update({
          collection: 'companies',
          where: {
            resetPasswordToken: {
              equals: token,
            },
          },
          data: {
            hasSetPassword: true,
          },
          req: req,
        })

        return Response.json(
          await req.payload.resetPassword({
            collection: 'companies',
            data: {
              password,
              token,
            },
            req: req, // pass a Request object to be provided to all hooks
            overrideAccess: false,
          }),
        )
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
    },
    {
      name: 'courseAreas',
      type: 'select',
      options: ['Mathematics', 'Science', 'History', 'Engineering', 'Arts'],
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
      name: 'hasSetPassword',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
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
    {
      name: 'updatedAt',
      type: 'text',
    },
    {
      name: 'createdAt',
      type: 'text',
    },
  ],
}
