import type { CollectionConfig } from 'payload'

import { students } from '@/access/sutdents'
import { relatedStudent } from '@/access/internship-applications/relatedStudent'
import { relatedStudentOrCompany } from '@/access/interview-invitations/relatedStudentOrCompany'
import { anyone } from '@/access/anyone'

export const InternshipApplications: CollectionConfig = {
  slug: 'internship-applications',
  access: {
    create: students,
    delete: relatedStudent,
    update: relatedStudent,
    read: anyone
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
