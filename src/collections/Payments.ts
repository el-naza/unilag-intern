import type { CollectionConfig } from 'payload'

import { students } from '@/access/students'
import { relatedStudent } from '@/access/reports/relatedStudent'
import { relatedStudentOrCompany } from '@/access/relatedStudentOrCompany'

export const Payments: CollectionConfig = {
  slug: 'payments',
  access: {
    create: () => false,
    delete: () => false,
    update: () => false,
    read: () => false,
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'rate',
      type: 'number',
      defaultValue: 0.01, // Current rate at the time of writing is 1% (0.01)
      required: true,
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'student_id',
          type: 'text',
          required: true,
        },
        {
          name: 'matriculation_number',
          type: 'text',
        },
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'paymentProvider',
      type: 'text',
      admin: {
        description: 'The payment provider used (e.g., Paystack)',
      },
      required: true,
    },
    {
      name: 'transactionReference',
      type: 'text',
      admin: {
        description: 'Payment transaction reference number',
      },
      required: true,
    },
  ],
}
