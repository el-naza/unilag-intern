// import type { CollectionConfig, Where } from 'payload'
// import { companies } from '@/access/companies'
// import { relatedStudentOrCompany } from '@/access/interview-invitations/relatedStudentOrCompany'
// import { relatedCompany } from '@/access/interview-invitations/relatedCompany'
// import { parse } from 'qs-esm'

// export const InterviewInvitations: CollectionConfig = {
//   slug: 'interview-invitations',
//   access: {
//     read: relatedStudentOrCompany,
//     create: companies,
//     delete: relatedCompany,
//     update: relatedStudentOrCompany,
//   },
//   fields: [
//     {
//       name: 'student',
//       type: 'relationship',
//       relationTo: 'students',
//       required: true,
//     },
//     {
//       name: 'company',
//       type: 'relationship',
//       relationTo: 'companies',
//       required: true,
//     },
//     {
//       name: 'message',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'dateTime',
//       type: 'date',
//       required: true,
//     },
//     {
//       name: 'status',
//       type: 'select',
//       options: ['pending', 'accepted', 'declined'],
//       defaultValue: 'pending',
//     },
//     {
//       name: 'declineReason',
//       type: 'text',
//     },
//   ],
//   endpoints: [
//     {
//       method: 'get',
//       path: '/',
//       handler: async (req) => {
//         const { status } = req.query

//         const whereStatus: Where = parse(req.query)

//         const where: Where = {
//           ...(req.user?.collection === 'companies'
//             ? { company: { equals: req.user.id } }
//             : req.user?.collection === 'students'
//               ? { student: { equals: req.user.id } }
//               : {}),
//           ...(status ? whereStatus : {}),
//         }

//         const interviewInvitationFindRes = await req.payload.find({
//           collection: 'interview-invitations',
//           where,
//           showHiddenFields: true,
//         })

//         return Response.json(interviewInvitationFindRes, { status: 200 })
//       },
//     },
//     {
//       method: 'get',
//       path: '/:id',
//       handler: async (req) => {
//         const { id } = req.routeParams

//         const interviewInvitationFindRes = await req.payload.findByID({
//           collection: 'interview-invitations',
//           id,
//           showHiddenFields: true,
//         })

//         return Response.json(interviewInvitationFindRes, { status: 200 })
//       },
//     },
//   ],
// }


import type { CollectionConfig, Where, GlobalBeforeChangeHook  } from 'payload'
import { companies } from '@/access/companies'
import { relatedStudentOrCompany } from '@/access/interview-invitations/relatedStudentOrCompany'
import { relatedCompany } from '@/access/interview-invitations/relatedCompany'
import { parse } from 'qs-esm'

// Hook to create an employment record when status is updated to 'accepted'
const createEmploymentOnAcceptance: GlobalBeforeChangeHook = async ({ data, req, originalDoc }) => {
  if (data.status === 'accepted' && originalDoc?.status !== 'accepted') {
    await req.payload.create({
      collection: 'employments',
      data: {
        student: originalDoc.student,
        company: originalDoc.company,
      },
    })
  }
}

export const InterviewInvitations: CollectionConfig = {
  slug: 'interview-invitations',
  access: {
    read: relatedStudentOrCompany,
    create: companies,
    delete: relatedCompany,
    update: relatedStudentOrCompany,
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      required: true,
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'message',
      type: 'text',
      required: true,
    },
    {
      name: 'dateTime',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'accepted', 'declined'],
      defaultValue: 'pending',
    },
    {
      name: 'declineReason',
      type: 'text',
    },
  ],
  hooks: {
    beforeChange: [createEmploymentOnAcceptance],
  },
  endpoints: [
    {
      method: 'get',
      path: '/',
      handler: async (req) => {
        const { status } = req.query

        const whereStatus: Where = parse(req.query)

        const where: Where = {
          ...(req.user?.collection === 'companies'
            ? { company: { equals: req.user.id } }
            : req.user?.collection === 'students'
              ? { student: { equals: req.user.id } }
              : {}),
          ...(status ? whereStatus : {}),
        }

        const interviewInvitationFindRes = await req.payload.find({
          collection: 'interview-invitations',
          where,
          showHiddenFields: true,
        })

        return Response.json(interviewInvitationFindRes, { status: 200 })
      },
    },
    {
      method: 'get',
      path: '/:id',
      handler: async (req) => {
        const { id } = req.routeParams

        const interviewInvitationFindRes = await req.payload.findByID({
          collection: 'interview-invitations',
          id,
          showHiddenFields: true,
        })

        return Response.json(interviewInvitationFindRes, { status: 200 })
      },
    },
  ],
}
