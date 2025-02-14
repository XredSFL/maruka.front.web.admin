import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const news = formData.get('news');
    const photo = formData.get('photo');

    // Prepare update object
    const updateData = {
      title,
      news,
      updated_at: knex.fn.now()
    };

    // Handle photo upload if a new photo is provided
    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Ensure the upload directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news-photos');
      await mkdir(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${photo.name}`;
      await writeFile(path.join(uploadDir, filename), buffer);

      const photoPath = `/uploads/news-photos/${filename}`;
      updateData.photo = photoPath;

      // Delete old photo if exists
      const oldNews = await knex('news').where({ id }).first('photo');
      if (oldNews && oldNews.photo) {
        const oldPhotoPath = path.join(process.cwd(), 'public', oldNews.photo);
        try {
          await unlink(oldPhotoPath);
        } catch (unlinkError) {
          console.error('Error deleting old photo:', unlinkError);
          // Continue even if old photo deletion fails
        }
      }
    }

    // Update the database
    await knex('news')
      .where({ id })
      .update(updateData);

    return NextResponse.json({ message: 'News updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}