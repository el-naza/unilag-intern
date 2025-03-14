import type { CollectionConfig } from 'payload'
import { companies } from '@/access/companies'
import { any } from 'zod'
import courseAreas from '@/utilities/courseAreas'

// Define the access control functions
const self = ({ req }) => {
  return {
    id: { equals: req.user?.id }, // Ensures only the user who created the internship can update/delete
  }
}

const companyOrStudent = async ({ req: { user, payload } }) => {
  if (!user) return false; 

  const isCompany = user.collection === 'companies';
  const isStudent = user.collection === 'students';

  if (isCompany) {
    return {
      company: { equals: user.id },
    };
  }

  if (isStudent) {
    return true;
  }

  return false; 
};


const anyone = () => true // Allows public read access

export const Internships: CollectionConfig = {
  slug: 'internships',
  access: {
    create: companies,
    delete: self,
    read: companyOrStudent,
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
      name: 'courseArea',
      type: 'select',
      options: courseAreas,
      hasMany: true,
      required: true,
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
