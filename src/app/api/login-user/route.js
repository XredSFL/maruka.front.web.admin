import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('Login attempt for email:', email);

    const user = await knex('users').where({ email }).first();

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    console.log('User found, verifying password');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    console.log('Password verified, generating token');

    const token = await generateToken(user.id);
    console.log('Generated token:', token);

    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }, 
      { status: 200 }
    );

    // Set token as httpOnly cookie
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV !== 'development', 
      sameSite: 'strict',
      maxAge: 86400 // 1 day in seconds
    });

    console.log('Login successful, returning response');
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}