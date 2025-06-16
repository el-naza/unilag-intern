import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'

const roleRoutesMap: Record<string, string[]> = {
  students: ['/student'],
}

export default NextAuth(authConfig).auth

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const authUser: any = await getToken({
    secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'),
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  const authToken: string = authUser?.token
  const isAuthenticated = !!authToken

  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${request.nextUrl.pathname}`, request.url),
    )
  }

  const authRole = authUser?.user.collection

  // Check if the user's role is allowed to access the current path
  const allowedPaths = roleRoutesMap[authRole] || []
  const isAllowed = allowedPaths.some((prefix) => pathname.startsWith(prefix))

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/student/:path*'],
}
