// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Students } from './collections/Students'
import { getServerSideURL } from './utilities/getURL'
import { Companies } from './collections/Companies'
import { Admins } from './collections/Admins'
import { InterviewInvitations } from './collections/InterviewInvitations'
import { DepartmentalCoordinators } from './collections/DepartmentalCoordinators'
import { InternshipApplications } from './collections/InternshipApplications'
import { Employments } from './collections/Employments'
import { Reports } from './collections/Reports'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  collections: [
    Media,
    Admins,
    Companies,
    DepartmentalCoordinators,
    Students,
    InterviewInvitations,
    InternshipApplications,
    Employments,
    Reports,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_USER!,
    defaultFromName: 'UNILAG INTERNSHIP',
    transportOptions: {
      host: 'smtp.titan.email',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  }),
  plugins: [
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
