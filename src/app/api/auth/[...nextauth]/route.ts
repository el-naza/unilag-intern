import axiosInstance from '@/utilities/axiosInstance'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'johndoe' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password, col }: any = credentials
        const res = await axiosInstance.post(`/api/${col}/login`, {
          username,
          password,
        })
        const user = await res.data

        if (user) {
          return user
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

export { handler as GET, handler as POST }
