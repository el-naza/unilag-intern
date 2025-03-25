import type { CollectionConfig } from 'payload'

import { companies } from '@/access/companies'
import { relatedCompany } from '@/access/relatedCompany'
import { relatedStudentOrCompany } from '@/access/relatedStudentOrCompany'
import { authenticatedUsers } from '@/access/authenticated-users'
import { companyOrStudent } from './Companies/Internships'

export const Employments: CollectionConfig = {
  slug: 'employments',
  access: {
    create: companies,
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
      name: 'dateEnded',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'Decline', 'Accept', 'Terminate'],
      defaultValue: 'pending',
    },
  ],
}
