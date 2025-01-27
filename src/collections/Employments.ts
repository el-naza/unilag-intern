import type { CollectionConfig } from 'payload'

import { companies } from '@/access/companies'
import { relatedCompany } from '@/access/relatedCompany'

export const Employments: CollectionConfig = {
  slug: 'employments',
  access: {
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
