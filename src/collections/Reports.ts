import type { CollectionConfig, FieldAccess } from 'payload'

import { students } from '@/access/students'
import { relatedStudent } from '@/access/reports/relatedStudent'
import { relatedCompany } from '@/access/reports/relatedCompany'
import { relatedStudentOrCompany } from '@/access/reports/relatedStudentOrCompany'

export const Reports: CollectionConfig = {
  slug: 'reports',
  access: {
    create: students,
    delete: relatedStudent,
    update: relatedStudentOrCompany,
    read: relatedStudentOrCompany,
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
      access: {
        update: relatedCompany,
        create: relatedCompany,
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'approved', 'reassigned'],
      defaultValue: 'pending',
      access: {
        update: relatedCompany,
        create: relatedCompany,
      },
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
    {
      name: 'grade',
      type: 'select',
      options: ['A', 'B', 'C', 'D', 'E', 'F'],
      defaultValue: () => null,
    },
  ],
}
