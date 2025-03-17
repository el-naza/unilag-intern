import type { CollectionConfig } from 'payload'

import { students } from '@/access/sutdents'
import { relatedStudent } from '@/access/reports/relatedStudent'
import { companyOrStudent } from './Companies/Internships'
import { anyone } from '@/access/anyone'

export const Reports: CollectionConfig = {
  slug: 'reports',
  access: {
    create: students,
    delete: relatedStudent,
    update: anyone,
  },
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
      name: 'status',
      type: 'select',
      options: ['approved', 'reasign','pending'],
      defaultValue: 'pending',
    },
    {
      name: 'remark',
      type: 'select',
      options: ['excellent', 'fair', 'good', 'need improvement', 'poor', 'pending'],
      defaultValue: 'pending',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
