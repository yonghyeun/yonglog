import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) => {
  const response = NextResponse.redirect('http://localhost:3000/dev');
  response.headers.set('Authroization', 'barer hihi-token');
  return response;
};
