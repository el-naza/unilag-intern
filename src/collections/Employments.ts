import type { CollectionConfig } from 'payload'

import { companies } from '@/access/companies'
import { relatedCompany } from '@/access/relatedCompany'
import { relatedStudentOrCompany } from '@/access/relatedStudentOrCompany'

export const Employments: CollectionConfig = {
  slug: 'employments',
  access: {
    read: relatedStudentOrCompany,
    create: companies,
    delete: relatedCompany,
    update: relatedCompany,
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
      name: 'dateEnded',
      type: 'date',
    },
  ],
}
