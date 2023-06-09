import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react"
export default withAuth(
  function middleware(req, token) {
    console.log("token: ", req.nextauth.token);  
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return token?.role === "employee"
        }
        // `/me` only requires the user to be logged in
        return !!token
      }
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};