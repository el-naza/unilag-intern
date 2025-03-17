import type { CollectionConfig } from 'payload'

import { companies } from '@/access/companies'
import { relatedCompany } from '@/access/relatedCompany'
import { relatedStudentOrCompany } from '@/access/relatedStudentOrCompany'
import { authenticatedUsers } from '@/access/authenticated-users'

export const Employments: CollectionConfig = {
  slug: 'employments',
  access: {
    create: companies,
    delete: relatedStudentOrCompany,
    update: relatedCompany,
    read: authenticatedUsers,
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
