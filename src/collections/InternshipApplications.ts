import type { CollectionConfig } from 'payload'

import { relatedStudent } from '@/access/internship-applications/relatedStudent'
import { relatedStudentOrCompany } from '@/access/interview-invitations/relatedStudentOrCompany'
import { anyone } from '@/access/anyone'
import { companyOrStudent } from './Companies/Internships'
import { students } from '@/access/students'

export const InternshipApplications: CollectionConfig = {
  slug: 'internship-applications',
  access: {
    create: students,
    delete: relatedStudentOrCompany,
    update: companyOrStudent,
    read: companyOrStudent,
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation, req }) => {
        if (operation === 'create') {
          // check if student has already applied to the internship
          const data = args
          const { internship, student } = data
          const internshipId = internship?.id || internship
          const studentId = student?.id || student
          if (!internshipId || !studentId) {
            throw new Error('Internship and student are required')
          }

          const internshipApplications = await req.payload.find({
            collection: 'internship-applications',
            depth: 0,
            limit: 1,
            where: {
              internship: {
                equals: internshipId,
              },
              student: {
                equals: studentId,
              },
            },
            overrideAccess: true,
          })
          if (internshipApplications.docs.length > 0) {
            throw new Error('Student has already applied to this internship')
          }
        }

        return args
      },
    ],
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
      name: 'internship',
      type: 'relationship',
      relationTo: 'internships',
      // required: true,
    },
    {
      name: 'letter',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'cancelled', 'approved', 'student declined', 'company declined'],
      defaultValue: 'pending',
    },
    {
      name: 'interviewInvitation',
      type: 'relationship',
      relationTo: 'interview-invitations',
    },
  ],
}
