import type { CollectionConfig } from 'payload'

import { self } from '@/access/self'
import { anyone } from '@/access/anyone'
import { NextResponse as Response } from 'next/server'
import { z } from 'zod'
import * as otpGenerator from 'otp-generator'
import bcrypt from 'bcryptjs'
import { isBefore } from 'date-fns'
import { generateEmailHTML } from '../../utilities/generateEmail'
import { admins } from '@/access/admins'
import { studentSelfOrAdmin } from '@/access/studentSelfOrAdmin'
const PreLogin = z.object({
  matricNo: z.string(),
})

export type StudentPreLogin = z.infer<typeof PreLogin>

export const Students: CollectionConfig = {
  slug: 'students',
  access: {
    create: anyone,
    delete: studentSelfOrAdmin,
    // read: authenticatedUsers,
    read: anyone,
    update: studentSelfOrAdmin,
  },
  hooks: {
    beforeOperation: [
      async ({ args, req, operation }) => {
        // in order to login with matric no. as the username thru REST API
        if (req.data?.matricNo && args.data)
          args.data.username = req.data?.matricNo?.toLowerCase?.()

        return args
      },
    ],
    afterRead: [
      async ({ req, doc }) => {
        const employmentRecords = await req.payload.find({
          collection: 'employments',
          where: { student: { equals: doc.id } },
          depth: 0,
        })

        doc.employments = employmentRecords.docs // Attach employment records to student
        return doc
      },
    ],
  },
  auth: {
    loginWithUsername: {
      requireEmail: true,
    },
    forgotPassword: {
      generateEmailHTML,
      //     generateEmailHTML: (args) => {
      //       console.log('Generating email, OTP from context:', args?.req?.context)

      //       return `
      //   <!doctype html>
      //   <html>
      //     <body>
      //       <h1>PASSWORD RESET OTP</h1>
      //       <p>Hello, ${args?.user.email}!</p>
      //       <p>Use the OTP below to reset your password.</p>
      //       <p>
      //         ${args?.req?.context?.otp}
      //       </p>
      //     </body>
      //   </html>
      // `
      //     },
    },
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
          showHiddenFields: true,
        })

        if (studentFindRes.docs.length === 0) {
          return Response.json(
            { message: 'This matric no. has not been registered' },
            { status: 404 },
          )
        }

        const { hasSetPassword } = studentFindRes.docs[0]

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

        const res = await req.payload.forgotPassword({
          collection: 'students',
          data: {
            username: data!.matricNo,
          } as any,
          req: req,
        })

        console.log('forgot password res', res)

        if (!res) {
          return Response.json(
            { message: 'This matric no. has not been registered' },
            { status: 404 },
          )
        }

        const updateRes = await req.payload.update({
          collection: 'students',
          where: {
            matricNo: {
              equals: data!.matricNo,
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
          return Response.json({ message: 'Matric no. and otp must be specified' }, { status: 400 })
        }

        const studentFindRes = await req.payload.find({
          collection: 'students',
          where: {
            matricNo: { equals: matricNo },
          },
          showHiddenFields: true,
        })

        if (studentFindRes.docs.length === 0) {
          return Response.json(
            { message: 'This matric no. has not been registered' },
            { status: 404 },
          )
        }

        const { resetPasswordOtpHash, resetPasswordToken, resetPasswordExpiration, id } =
          studentFindRes.docs[0]

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
          collection: 'students',
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
            collection: 'students',
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
      // hidden: true,
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
      name: 'image',
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
    {
      name: 'resetPasswordOtpHash',
      type: 'text',
      hidden: true,
    },
    {
      name: 'coins',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
