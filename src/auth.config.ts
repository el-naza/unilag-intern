import type { NextAuthConfig, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export const authConfig = {
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
      // console.log('token aspect user', user)
      if (user) {
        token.user = { ...token.user, ...user } as any
      }

      if ((user as any)?.token) {
        token.token = (user as any).token
        delete token.user.token
      }

      if (trigger === 'update') {
        token.user = { ...(token.user as object), ...session }
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user as any
      // delete session.user.token
      // console.log('session aspect token', token)
      // console.log('session aspect', session)
      return session
    },
  },
  providers: [],
  trustHost: true,
} satisfies NextAuthConfig
