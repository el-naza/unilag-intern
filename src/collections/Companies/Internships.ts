import type { CollectionConfig } from 'payload'
import { companies } from '@/access/companies'
import { any } from 'zod'

// Define the access control functions
const self = ({ req }) => {
  return {
    id: { equals: req.user?.id }, // Ensures only the user who created the internship can update/delete
  }
}

const anyone = () => true // Allows public read access

export const Internships: CollectionConfig = {
  slug: 'internships',
  access: {
    create: companies,
    delete: self,
    read: anyone,
    update: self,
  },
  fields: [
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'postDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'jobDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'select',
      options: ['Lagos'],
      defaultValue: 'Lagos',
    },
    {
      name: 'applicants',
      type: 'relationship',
      relationTo: 'students',
      hasMany: true,
    },
    {
      name: 'deadline',
      type: 'date',
    //   required: true,
    },
    { name: 'startDate', type: 'date', required: true },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['open', 'closed'],
      defaultValue: 'open',
    },
  ],
}
