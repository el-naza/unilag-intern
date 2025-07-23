import type { CollectionConfig, Where, CollectionAfterChangeHook } from 'payload'

import { authenticatedUsers } from '@/access/authenticated-users'
import { self } from '@/access/self'
import { anyone } from '@/access/anyone'
import { parse } from 'qs-esm'
// import { NextResponse as Response } from 'next/server'
// import { z } from 'zod'
import { generateEmailHTML } from '../../utilities/generateEmail'
import { NextResponse as Response } from 'next/server'
import * as otpGenerator from 'otp-generator'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { isBefore } from 'date-fns'
import industries from '@/utilities/industries'
import { Company } from '@/payload-types'
import { error } from 'console'
import { companySelfOrAdmin } from '@/access/companySelfOrAdmin'

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
    delete: companySelfOrAdmin,
    read: anyone,
    update: companySelfOrAdmin,
  },
  auth: {
    forgotPassword: {
      generateEmailHTML,
    },
    tokenExpiration: 30 * 24 * 60 * 60, // 30 days
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
          message: `Your password has${hasSetPassword ? ' ' : ' not '}been set`,
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

        const res = await req.payload.forgotPassword({
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
    {
      method: 'get',
      path: '/suggestions',
      handler: async (req) => {
        const { companyId } = req.query

        if (!companyId) {
          return Response.json({ message: 'Please enter a valid job name' }, { status: 400 })
        }

        const companyFindRes = await req.payload.find({
          collection: 'companies',
          where: {
            id: { not_equals: companyId },
          },
          showHiddenFields: true,
          limit: 4,
        })

        return Response.json(companyFindRes, { status: 200 })
      },
    },
    {
      method: 'post',
      path: '/batch-upload',
      handler: async (req) => {
        const { companies }: { companies: Company[] } = (await req.json?.()) ?? { companies: [] }

        if (!Array.isArray(companies) || companies.length === 0) {
          return Response.json({ message: 'Invalid or empty data array' }, { status: 400 })
        }

        const createdCompanies: string[] = []
        const skippedCompanies: { email: string; reason: string }[] = []
        const errors: { email: string; error: string }[] = []

        for (const company of companies) {
          try {
            const existing = await req.payload.find({
              collection: 'companies',
              where: {
                email: {
                  equals: company.email,
                },
              },
            })

            if (existing.docs.length > 0) {
              skippedCompanies.push({ email: company.email, reason: 'Company already exists' })
              continue
            }

            const created = await req.payload.create({
              collection: 'companies',
              data: {
                ...company,
                password: company.password || 'DefaultPassword123',
                hasSetPassword: false,
              },
              req,
            })

            createdCompanies.push(created.email)

            req.payload
              .sendEmail({
                to: created.email,
                subject: 'Welcome to INTRNS',
                text: `Dear ${created.name},\n\nWelcome! We’re excited to have you onboard.\n\nINTRNS Team`,
              })
              .catch((e) => {
                console.error(`Failed to send email to ${created.email}`, e)
              })
          } catch (err: any) {
            errors.push({ email: company.email || '[no-email]', error: err.message })
          }
        }

        return Response.json(
          {
            message: 'Batch upload completed',
            successCount: createdCompanies.length,
            skippedCount: skippedCompanies.length,
            errorCount: errors.length,
            createdCompanies,
            skippedCompanies,
            errors,
          },
          { status: 200 },
        )
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ operation, doc, req }) => {
        const company = doc as Company

        if (operation === 'create') {
          console.log(
            `Sending company welcome email to "${company.name}" which registered through waiting list`,
          )
          req.payload
            .sendEmail({
              to: doc.email,
              subject: 'Welcome',
              text: `Dear ${company.name}

We are glad to have you as part of our corporate community and we cannot wait to introduce you to the best and the brightest minds from our network of students.

You would be notified as soon as your company begins to receive applications from suitable applicants.

Kindly contact us at help@intrns.com for any inquiries.

Thank you.

Best regards,
INTRNS Team`,
            })
            .catch((error) => {
              console.error(
                `An error occured while attempting to send welcome email to ${company.name}`,
                error,
              )
            })
        }
      },
    ],
    afterRead: [
      async ({ doc, req }) => {
        const employments = await req.payload.find({
          collection: 'employments',
          req,
          depth: 0,
          where: {
            company: { equals: doc.id },
          },
          overrideAccess: true,
        })
        const internships = await req.payload.find({
          collection: 'internships',
          req,
          limit: 1,
          depth: 0,
          where: {
            company: { equals: doc.id },
          },
          overrideAccess: true,
        })
        const internshipApplications = await req.payload.find({
          collection: 'internship-applications',
          req,
          depth: 0,
          where: {
            company: { equals: doc.id },
          },
          overrideAccess: true,
        })

        const firstInternship = internships.docs.length ? internships.docs[0] : null
        return {
          ...doc,
          employmentCount: employments.docs.length,
          firstInternship,
          internshipApplicationCount: internshipApplications.docs.length,
        }
      },
    ],
  },
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
      unique: true,
    },
    {
      name: 'industry',
      type: 'select',
      options: industries,
      // hasMany: true,
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
      name: 'image',
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
    {
      name: 'isWaiting',
      type: 'checkbox',
    },
  ],
}
