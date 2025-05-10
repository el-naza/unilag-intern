import type { CollectionConfig, FieldAccess } from 'payload'
import { companies } from '@/access/companies'
import { students } from '@/access/students'
import courseAreas from '@/utilities/courseAreas'

// Restrict update/delete to the user who created the internship
const self = ({ req }) => {
  return {
    id: { equals: req.user?.id },
  }
}

// Custom read access for companies and students
export const companyOrStudent = async ({ req: { user } }) => {
  if (!user) return false

  if (user.collection === 'companies') {
    return {
      company: { equals: user.id },
    }
  }

  if (user.collection === 'students') {
    return true
  }

  return false
}

export const Internships: CollectionConfig = {
  slug: 'internships',
  access: {
    create: companies,
    read: companyOrStudent,
    update: self,
    delete: self,
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
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      options: ['open', 'closed'],
      defaultValue: 'open',
    },
    {
      name: 'hasStudentApplied',
      type: 'checkbox',
      defaultValue: false,
      virtual: true,
      access: {
        read: students as FieldAccess,
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (!req?.user || req.user.collection !== 'students') return false
            if (!data?.id) return false

            const application = await req.payload.find({
              collection: 'internship-applications',
              req,
              limit: 1,
              depth: 0,
              where: {
                student: { equals: req.user.id },
                internship: { equals: data.id },
              },
              overrideAccess: true,
            })

            return application.docs.length > 0
          },
        ],
      },
    },
  ],
}
