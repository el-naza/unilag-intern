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
