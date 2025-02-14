import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const rows = await knex('news').select('*');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('photo');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news-photos');
    await mkdir(uploadDir, { recursive: true });

    // Save the file
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Get the relative path to store in the database
    const photoPath = `/uploads/news-photos/${fileName}`;

    const [id] = await knex('news').insert({
      title: formData.get('title'),
      news: formData.get('news'),
      photo: photoPath
    });

    return NextResponse.json({ message: 'News added successfully', id });
  } catch (error) {
    console.error('Error saving news:', error);
    return NextResponse.json({ error: 'Failed to save news' }, { status: 500 });
  }
}