import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const rows = await knex('group_companies').select('*');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching group companies:', error);
    return NextResponse.json({ error: 'Failed to fetch group companies' }, { status: 500 });
  }
}

import { unlink } from 'fs/promises';

export async function POST(req) {
  const trx = await knex.transaction();
  try {
    const formData = await req.formData();
    const file = formData.get('photo');
    const companyId = formData.get('id'); // Add this to handle updates

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'group-companies');
    await mkdir(uploadDir, { recursive: true });

    // Save the file
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Get the relative path to store in the database
    const photoPath = `/uploads/group-companies/${fileName}`;

    let id;
    if (companyId) {
      // This is an update
      const existingCompany = await trx('group_companies').where({ id: companyId }).first();
      if (existingCompany && existingCompany.photo) {
        // Delete old photo
        const oldPhotoPath = path.join(process.cwd(), 'public', existingCompany.photo);
        try {
          await unlink(oldPhotoPath);
        } catch (error) {
          console.error(`Failed to delete old image: ${oldPhotoPath}`, error);
        }
      }

      await trx('group_companies').where({ id: companyId }).update({
        company_name: formData.get('companyName'),
        address: formData.get('address'),
        link_map: formData.get('linkMap'),
        description: formData.get('description'),
        photo: photoPath
      });
      id = companyId;
    } else {
      // This is a new insertion
      [id] = await trx('group_companies').insert({
        company_name: formData.get('companyName'),
        address: formData.get('address'),
        link_map: formData.get('linkMap'),
        description: formData.get('description'),
        photo: photoPath
      });
    }

    await trx.commit();

    return NextResponse.json({ message: companyId ? 'Group company updated successfully' : 'Group company added successfully', id });
  } catch (error) {
    console.error('Error saving group company:', error);
    await trx.rollback();
    return NextResponse.json({ error: 'Failed to save group company' }, { status: 500 });
  }
}