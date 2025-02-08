import { Admin, Company, Student } from '@/payload-types'

// import { User } from 'api'
import 'next-auth'
import 'next-auth/jwt'
// import 'next-auth/adapters'

type UserObject = (Student | Admin | Company) & { col: 'students' | 'admins' | 'companies' } & {
  token?: string
}

interface JwtExtension {
  token?: string // Custom field token
  user: UserObject
  // roles?: User['roles'] // Custom user role field
}

declare module 'next-auth/jwt' {
  interface JWT extends JwtExtension {}
}

declare module 'next-auth' {
  interface User extends UserObject {}
  interface AdapterUser {
    emailVerified?: Date | null
  }
  interface Session {
    user: JwtExtension['user']
  }
}
