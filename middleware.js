import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token?.role !== 'admin') {
      return Response.redirect(new URL('/auth/signin', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Must be signed in
    },
  }
);

export const config = { matcher: ['/admin/:path*'] };