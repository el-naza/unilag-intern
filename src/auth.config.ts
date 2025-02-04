import type { NextAuthConfig } from 'next-auth'

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
      if (user) {
        token.user = { ...(token.user as object), ...user }
      }

      if (trigger === 'update') {
        token.user = { ...(token.user as object), ...session }
      }

      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
