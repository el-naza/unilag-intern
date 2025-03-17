import type { CollectionConfig } from 'payload'

import { students } from '@/access/sutdents'
import { relatedStudent } from '@/access/reports/relatedStudent'
import { relatedStudentOrCompany } from '@/access/relatedStudentOrCompany'

export const Reports: CollectionConfig = {
  slug: 'reports',
  // access: {
  //   create: students,
  //   delete: relatedStudent,
  //   update: relatedStudentOrCompany,
  // },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'details',
      type: 'text',
      required: true,
    },
    {
      name: 'supervisor',
      type: 'text',
      required: true,
    },
    {
      name: 'memo',
      type: 'text',
    },
    {
      name: 'remark',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'approved', 'reassigned'],
      defaultValue: 'pending',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'week',
      type: 'number',
      required: true,
    },
  ],
}
