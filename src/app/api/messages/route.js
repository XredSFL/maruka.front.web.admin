import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda

export async function GET() {
  try {
    const rows = await knex('messages').select('*');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const [id] = await knex('messages').insert({
      name: formData.get('name'),
      no_phone: formData.get('no_phone'),
      email: formData.get('email'),
      messages: formData.get('messages')
    });

    return NextResponse.json({ message: 'Message sent', id });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}