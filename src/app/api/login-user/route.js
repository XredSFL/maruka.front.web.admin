import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import bcrypt from 'bcryptjs'; // Menggunakan bcryptjs untuk kompatibilitas yang lebih baik
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('Login attempt for email:', email);

    // Cari user berdasarkan email
    const user = await knex('users')
      .where({ email })
      .first();

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    console.log('User found, verifying password');

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    console.log('Password verified, generating token');

    // Generate token
    const token = await generateToken(user.id);
    console.log('Generated token:', token);

    // Buat response dengan token
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name, // Tambahkan nama jika tersedia
          // Tambahkan field lain yang diperlukan, tapi jangan sertakan password
        }
      }, 
      { status: 200 }
    );

    // Set token sebagai httpOnly cookie
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: false, 
      sameSite: 'strict',
      maxAge: 86400 // 1 hari dalam detik
    });

    console.log('Login successful, returning response');
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Menangani metode HTTP lainnya
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}