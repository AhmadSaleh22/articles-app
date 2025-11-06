import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // You can add additional logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if user is authenticated, false otherwise
        return !!token
      },
    },
    pages: {
      signIn: '/auth/login',
    },
  }
)

export const config = {
  matcher: [
    '/profile/:path*',
    // Add other protected routes here
    // '/admin/:path*', // Uncomment to protect all admin routes
  ],
}
