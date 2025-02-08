import type { CollectionConfig } from 'payload'

import { companies } from '@/access/companies'
import { relatedCompany } from '@/access/relatedCompany'

export const InterviewInvitations: CollectionConfig = {
  slug: 'interview-invitations',
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
      name: 'message',
      type: 'text',
      required: true,
    },
    {
      name: 'dateTime',
      type: 'date',
      required: true,
    },
  ],
}
