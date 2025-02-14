import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Hapus cookie token
  response.cookies.set('token', '', { 
    httpOnly: true, 
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 0 // Ini akan menghapus cookie
  });

  return response;
}