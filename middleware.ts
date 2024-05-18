import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const tokenValue = token?.value;

    if (!tokenValue) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*', '/profile/:path*', '/checkout-success/:path*'],
};
