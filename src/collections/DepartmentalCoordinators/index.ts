import type { CollectionConfig } from 'payload'

import { self } from '@/access/self'
import { anyone } from '@/access/anyone'

export const DepartmentalCoordinators: CollectionConfig = {
  slug: 'departmental-coordinators',
  access: {
    create: anyone,
    delete: self,
    read: anyone,
    update: self,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      minLength: 1,
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'department',
      type: 'text',
      required: true,
    },
  ],
}
