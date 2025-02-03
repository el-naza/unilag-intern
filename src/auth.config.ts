import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { AxiosError } from 'axios'
import axiosInstance from '@/utilities/axiosInstance'
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  // providers: [
  //   Credentials({
  //     name: 'Credentials',
  //     credentials: {
  //       username: { label: 'Username', type: 'text', placeholder: 'johndoe' },
  //       password: { label: 'Password', type: 'password' },
  //     },
  //     async authorize(credentials) {
  //       const { username, password, col }: any = credentials
  //       // const res = await axiosInstance.post(`/api/${col}/login`, {
  //       console.log('creds input', username, password)
  //       const res = await axiosInstance
  //         .post(`/api/students/login`, {
  //           username,
  //           password,
  //         })
  //         .catch((err: AxiosError) => err.response)

  //       console.log('res', res?.data)

  //       if (res?.status === 401) {
  //         console.log('further processing', res?.status)
  //         return null
  //       }

  //       const user = res?.data?.user

  //       if (user) {
  //         return user
  //       }

  //       return null
  //     },
  //   }),
  // ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true
    },
    jwt: async ({ token, user, session, trigger }) => {
      console.log('jwt aspect', session, token)
      user && (token.user = { ...(token.user as object), ...user })

      if (trigger === 'update') {
        token.user = { ...(token.user as object), ...session }
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      // session.user = token.user;
      // console.log("session aspect", session);
      return session
    },
  },
  // session: {
  //   strategy: 'jwt',
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig
