import { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  if (/_next\/static\//.test(request.nextUrl.pathname)) return;
};
