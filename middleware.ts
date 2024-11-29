import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt/verifyToken"
import { cookies } from "next/headers";
import { UserJWT } from "./app/types/UserJWT";

export async function middleware(request: NextRequest) {
    const { pathname } = new URL(request.url);

    const token = request.cookies.get('user-token')?.value;

    // if user is not logged in and trying to access moderator, dashboard or admin page, redirect to login
    if (!token && (
        pathname.startsWith('/moderator') ||
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/admin')
    )) {
        console.log('redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // checking if token is valid
    const validToken = token && (await verifyToken(token).catch((e) => console.error(e.message)));

    // if token in invalid and trying to access moderator, dashboard or admin page, redirect to login
    if (!validToken && (
        pathname.startsWith('/moderator') ||
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/admin')
    )) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // if token is valid
    if (validToken) {

        if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        const { role } = validToken as UserJWT;
        // console.log('role:', role);

        // if role is user and trying to access moderator or admin page, redirect to dashboard
        if (role === 'USER' && (
            pathname.startsWith('/moderator') ||
            pathname.startsWith('/admin')
        )) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // if role is moderator and trying to access admin page, redirect to moderator page
        if (role === 'MODERATOR' && pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/moderator', request.url));
        }
    }
}

const config = {
    matcher: [
        'moderator/:path*',
        'dashboard/:path*',
        'admin/:path*',
        'login/',
        'signup/'
    ]
}