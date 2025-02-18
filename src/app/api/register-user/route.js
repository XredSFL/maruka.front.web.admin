import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log('Database connection config:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      // Don't log the password
    });

    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await knex('users')
      .where({ email })
      .first();

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user baru ke database
    const [userId] = await knex('users').insert({
      email,
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    });

    // Generate token untuk user baru
    const token = await generateToken(userId);

    // Buat response dengan token
    const response = NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: userId,
          email,
        }
      }, 
      { status: 201 }
    );

    // Set token sebagai httpOnly cookie
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV !== 'development', 
      sameSite: 'strict',
      maxAge: 86400 // 1 hari dalam detik
    });

    return response;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Menangani metode HTTP lainnya
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}