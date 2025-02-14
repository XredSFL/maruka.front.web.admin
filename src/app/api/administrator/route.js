import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import bcrypt from 'bcryptjs'; // Menggunakan bcryptjs untuk kompatibilitas yang lebih baik
import { generateToken } from '@/lib/auth';

export async function GET() {
  try {
    const users = await knex('users')
      .select('id', 'name', 'phone', 'email', 'country', 'status');
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id } = req.query;
    const { name, phone, email, country, status } = await req.json();

    // Update user
    const result = await knex('users')
      .where({ id })
      .update({
        name,
        phone,
        email,
        country,
        status,
        updated_at: knex.fn.now()
      });

    return NextResponse.json({ message: 'User updated successfully', result });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = req.query;

    // Delete user
    const result = await knex('users')
      .where({ id })
      .del();

    return NextResponse.json({ message: 'User deleted successfully', result });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Extract data from formData
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const password = formData.get('password');
    const country = formData.get('country');
    const status = formData.get('status');

    // Validate the data
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await knex('users')
      .where({ email })
      .first();

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into database
    const [userId] = await knex('users').insert({
      name,
      phone,
      email,
      password: hashedPassword,
      country,
      status,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    });

    // Generate token for the new user
    const token = await generateToken(userId);

    // Create response
    const response = NextResponse.json(
      { 
        message: 'Administrator created successfully',
        user: {
          id: userId,
          name,
          email,
          // Include other fields as needed, but not the password
        }
      }, 
      { status: 201 }
    );

    // Set token as httpOnly cookie
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV !== 'development', 
      sameSite: 'strict',
      maxAge: 86400 // 1 day in seconds
    });

    return response;
  } catch (error) {
    console.error('Error creating administrator:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add a new function for login
export async function LOGIN(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await knex('users')
      .where({ email })
      .first();

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate token
    const token = await generateToken(user.id);

    // Create response
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          // Include other fields as needed, but not the password
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

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}