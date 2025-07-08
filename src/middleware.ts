import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { headers } from 'next/headers'

const routePermissions: Record<string, { roles: string[]; loginPath: string }> = {
  '/student': {
    roles: ['students'],
    loginPath: '/auth/login',
  },
  '/company-pages': {
    roles: ['companies'],
    loginPath: '/company-auth/login',
  },
  '/admin': {
    roles: ['admins'],
    loginPath: '/admin/auth',
  },
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('Middleware triggered for path:', pathname)

  // Skip middleware for admin auth path
  if (pathname.startsWith('/admin/auth')) {
    return NextResponse.next()
  }

  // Extract first segment of the path
  const firstSegment = '/' + pathname.split('/')[1]

  const authUser: any = await getToken({
    secureCookie: process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https'),
    req: { headers: await headers() },
    secret: process.env.NEXTAUTH_SECRET,
  })

  const authToken: string = authUser?.token
  const isAuthenticated = !!authToken

  if (!isAuthenticated) {
    const routeConfig = routePermissions[firstSegment]
    const loginPath = routeConfig?.loginPath || '/auth/login'

    console.log(`User is not authenticated, redirecting to: ${loginPath}`)

    return NextResponse.redirect(
      new URL(`${loginPath}?redirect=${request.nextUrl.pathname}`, request.url),
    )
  }

  const authRole = authUser?.user.collection
  const routeConfig = routePermissions[firstSegment]

  if (!routeConfig || !routeConfig.roles.includes(authRole)) {
    const loginPath = routeConfig?.loginPath || '/auth/login'
    console.log(
      `User with role ${authRole} is not allowed to access ${pathname}, redirecting to:`,
      loginPath,
    )
    return NextResponse.redirect(new URL(loginPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/student/:path*', '/company-pages/:path*', '/admin/:path*'],
}
