import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda
import { writeFile } from 'fs/promises';
import path from 'path';

import fs from 'fs/promises';

export async function POST(request) {
  const trx = await knex.transaction();
  try {
    const formData = await request.formData();
    const page = formData.get('page');
    const sections = [];

    // Fetch existing photo paths
    const existingSections = await trx('landing_page_sections')
      .where({ page })
      .select('photo');
    const existingPhotoPaths = existingSections
      .map(section => section.photo)
      .filter(photo => photo);

    // Parse formData into sections array
    for (let i = 0; formData.get(`sections[${i}][title]`) !== null; i++) {
      const section = {
        title: formData.get(`sections[${i}][title]`),
        description: formData.get(`sections[${i}][description]`),
        clientTitle: formData.get(`sections[${i}][clientTitle]`),
        photo: formData.get(`sections[${i}][photo]`),
      };
      sections.push(section);
    }

    // Delete existing sections for this page
    await trx('landing_page_sections').where({ page }).del();

    // Insert new sections
    for (const section of sections) {
      let photoPath = null;
      if (section.photo instanceof Blob) {
        const buffer = Buffer.from(await section.photo.arrayBuffer());
        const filename = `${Date.now()}-${section.photo.name}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'landing-page');
        await writeFile(path.join(uploadDir, filename), buffer);
        photoPath = `/uploads/landing-page/${filename}`;
      }

      await trx('landing_page_sections').insert({
        page,
        title: section.title || null,
        description: section.description || null,
        client_title: section.clientTitle || null,
        photo: photoPath,
      });
    }

    // Delete old images
    for (const oldPhotoPath of existingPhotoPaths) {
      const fullPath = path.join(process.cwd(), 'public', oldPhotoPath);
      try {
        await fs.unlink(fullPath);
      } catch (error) {
        console.error(`Failed to delete old image: ${fullPath}`, error);
      }
    }

    await trx.commit();

    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    await trx.rollback();
    return NextResponse.json({ message: 'Error saving data', error: error.message }, { status: 500 });
  }
}