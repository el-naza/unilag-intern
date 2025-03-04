import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import axiosInstance from '@/utilities/axiosInstance'
import { AxiosError } from 'axios'
import signInUser from './services/signinUser'

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'johndoe' },
        password: { label: 'Password', type: 'password' },
        email: { label: 'email', type: 'email' },
      },
      async authorize(credentials) {
        // console.log('creds input', username, password)
        const res = await signInUser(credentials)

        // console.log('res', res?.data)

        if (res?.status === 401) {
          console.log('further processing', res?.status)
          return null
        }

        const user = res?.data?.user

        // console.log('res token', res?.data?.token)
        if (user) {
          return { ...user, token: res.data.token }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})
