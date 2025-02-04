// next-auth.d.ts
import { Admin, Company, Student } from '@/payload-types'
// import NextAuth from 'next-auth'

// import { User } from 'api'
import 'next-auth/jwt'
import 'next-auth/core/types'

interface JwtExtension {
  token?: string // Custom field for ID token
  // roles?: User['roles'] // Custom user role field
}

declare module 'next-auth/jwt' {
  interface JWT extends JwtExtension {}
}

// declare module 'next-auth' {
//   interface Session {
//     user: (Student | Admin | Company) & { col: 'students' | 'admins' | 'companies' }
//   }
// }
declare module 'next-auth/core/types' {
  interface Session {
    user: (Student | Admin | Company) & { col: 'students' | 'admins' | 'companies' }
  }
}
