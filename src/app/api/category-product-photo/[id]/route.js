import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda
import path from 'path';
import { writeFile, unlink } from 'fs/promises';

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const formData = await request.formData();
    const photo = formData.get('photo');

    if (!photo) {
      return NextResponse.json({ error: 'No photo provided' }, { status: 400 });
    }

    // Get the existing photo information
    const existingPhoto = await knex('category_product_photo')
      .where({ id })
      .first('photo_path');

    // Process the new photo
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'category-product-photos');
    const filename = `${Date.now()}-${photo.name}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    const newPhotoPath = `/uploads/category-product-photos/${filename}`;

    // Update the database with the new photo path
    await knex('category_product_photo')
      .where({ id })
      .update({ photo_path: newPhotoPath });

    // Delete the old photo if it exists
    if (existingPhoto && existingPhoto.photo_path) {
      const oldPhotoPath = path.join(process.cwd(), 'public', existingPhoto.photo_path);
      try {
        await unlink(oldPhotoPath);
      } catch (unlinkError) {
        console.error('Error deleting old photo:', unlinkError);
        // Continue even if old photo deletion fails
      }
    }

    return NextResponse.json({ message: 'Product photo updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating product photo:', error);
    return NextResponse.json({ error: 'Failed to update product photo' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  console.log(params);

  try {
    await knex.transaction(async (trx) => {
      // First, get the photo_path
      const photo = await trx('category_product_photo').where({ id }).first();
      
      if (photo && photo.photo_path) {
        // Delete the file
        const fullPath = path.join(process.cwd(), 'public', photo.photo_path);
        try {
          await unlink(fullPath);
        } catch (unlinkError) {
          console.error('Error deleting photo file:', unlinkError);
          // Continue with deletion even if file removal fails
        }
      }

      // Then delete the database entry
      await trx('category_product_photo').where({ id }).del();
    });

    return NextResponse.json({ message: 'Product photo deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product photo:', error);
    return NextResponse.json({ error: 'Failed to delete product photo' }, { status: 500 });
  }
}