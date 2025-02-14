import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const rows = await knex('service_team').select('*');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching service team:', error);
    return NextResponse.json({ error: 'Failed to fetch service team' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const photo = formData.get('photo');
    const pdf = formData.get('pdf');

    if (!photo || !pdf) {
      return NextResponse.json({ error: 'Both photo and PDF files are required' }, { status: 400 });
    }

    const photoBytes = await photo.arrayBuffer();
    const pdfBytes = await pdf.arrayBuffer();
    const photoBuffer = Buffer.from(photoBytes);
    const pdfBuffer = Buffer.from(pdfBytes);

    // Create the directories if they don't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'service-team', 'photo');
    const pdfUploadDir = path.join(process.cwd(), 'public', 'uploads', 'service-team', 'pdf');
    await mkdir(uploadDir, { recursive: true });
    await mkdir(pdfUploadDir, { recursive: true });

    // Save the files
    const photoName = `${Date.now()}_${photo.name}`;
    const pdfName = `${Date.now()}_${pdf.name}`;
    const photoPath = path.join(uploadDir, photoName);
    const pdfPath = path.join(pdfUploadDir, pdfName);
    await writeFile(photoPath, photoBuffer);
    await writeFile(pdfPath, pdfBuffer);

    // Get the relative paths to store in the database
    const photoRelativePath = `/uploads/service-team/photo/${photoName}`;
    const pdfRelativePath = `/uploads/service-team/pdf/${pdfName}`;

    const [id] = await knex('service_team').insert({
      service_team_name: formData.get('service_team_name'),
      description: formData.get('description'),
      photo: photoRelativePath,
      pdf: pdfRelativePath
    });

    return NextResponse.json({ message: 'Service team added successfully', id });
  } catch (error) {
    console.error('Error saving service team:', error);
    return NextResponse.json({ error: 'Failed to save service team' }, { status: 500 });
  }
}