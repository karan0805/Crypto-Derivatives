import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|logo.png|sitemap.xml|robots.txt).*)',
  ],
};
export function middleware(req) {
  let domain = req.headers.get('host');
  let path = req.nextUrl.pathname;

  if (domain == 'www.greex.trading' && path !== '/') {
    return NextResponse.rewrite(new URL(`/comingsoon`, req.url));
  }
}
