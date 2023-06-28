import { NextResponse, type NextRequest } from "next/server";
 
import { jwtVerify } from "jose";
 
export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;
 
  if (previousPage.startsWith("/checkout")) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECREET_SEED)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }
}
 
export const config = {
  matcher: ["/checkout/:path*"],
};

/*import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from './utils';

export async function middleware( req: NextRequest, ev: NextFetchEvent ) {
    const token = req.cookies.get('token')?.value || '';
    // return new Response('No autorizado', {
    //     status: 401
    // });

    try {
        await jwt.isValidToken( token );
        return NextResponse.next();
    } catch (error) {
        // return Response.redirect('/auth/login');
        const { pathname } = req.nextUrl;
        return NextResponse.redirect(
            new URL(`/auth/login?p=${ pathname }`, req.url)
        );
    }
}

export const config = {
    matcher: '/checkout/:path*',
}*/