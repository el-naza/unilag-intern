import type { CollectionConfig } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticatedUsers } from '../access/authenticated-users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticatedUsers,
    delete: () => false,
    read: anyone,
    update: authenticatedUsers,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    // filesRequiredOnCreate: false,
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          req.file.name = (req.user?.id ? `${req.user.id}-` : '') + Date.now() + '-' + req.file.name
        }
      },
    ],
  },
}
