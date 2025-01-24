import type { CollectionConfig } from 'payload'

import { students } from '@/access/sutdents'
import { relatedStudent } from '@/access/relatedStudent'

export const Reports: CollectionConfig = {
  slug: 'reports',
  access: {
    create: students,
    delete: relatedStudent,
    update: relatedStudent,
  },
  auth: true,
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
  ],
}
