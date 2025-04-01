import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { nobody } from '@/access/nobody'

export const EmailSubscribers: CollectionConfig = {
  slug: 'email-subscribers',
  access: {
    create: anyone,
    delete: nobody,
    update: nobody,
    read: anyone,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
  ],
}
