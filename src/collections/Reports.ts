import type { CollectionConfig } from 'payload'

import { students } from '@/access/sutdents'
import { relatedStudent } from '@/access/reports/relatedStudent'
import { companyOrStudent } from './Companies/Internships'
import { relatedStudentOrCompany } from '@/access/relatedStudentOrCompany'

export const Reports: CollectionConfig = {
  slug: 'reports',
  access: {
    read: relatedStudentOrCompany,
    create: students,
    delete: relatedStudent,
    update: companyOrStudent,
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      required: true,
    },
    {
      name: 'employment',
      type: 'relationship',
      relationTo: 'employments',
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
      options: ['approved', 'reasign', 'pending'],
      // defaultValue: 'pending',
    },
    {
      name: 'remark',
      type: 'select',
      options: ['Excellent', 'Fair', 'Good', 'Need Improvement', 'Poor'],
      // defaultValue: 'pending',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
