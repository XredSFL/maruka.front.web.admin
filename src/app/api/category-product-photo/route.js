import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    let query = knex('category_product_photo')
      .select('*')
      .orderBy('created_at', 'desc');

    if (id) {
      query = query.where('category_product_id', id);
    }

    const photos = await query;
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}

export async function POST(request) {
  const trx = await knex.transaction();
  try {
    const formData = await request.formData();
    const categoryProductId = formData.get('category_product_id');
    const photo = formData.get('photo');

    // if (!photo || !categoryProductId) {
    //   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    // }

    // Check for existing photo
    const existingPhoto = await trx('category_product_photo')
      .where({ category_product_id: categoryProductId })
      .first();

    // Process new photo
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'category-product-photos');
    const filename = `${Date.now()}-${photo.name}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    const photoPath = `/uploads/category-product-photos/${filename}`;

    let id;
    if (existingPhoto) {
      // Update existing record
      await trx('category_product_photo')
        .where({ category_product_id: categoryProductId })
        .update({ photo_path: photoPath });
      id = existingPhoto.id;

      // Delete old photo
      const oldPhotoPath = path.join(process.cwd(), 'public', existingPhoto.photo_path);
      try {
        await unlink(oldPhotoPath);
      } catch (error) {
        console.error(`Failed to delete old image: ${oldPhotoPath}`, error);
      }
    } else {
      // Insert new record
      [id] = await trx('category_product_photo').insert({
        category_product_id: categoryProductId,
        photo_path: photoPath,
      });
    }

    await trx.commit();

    return NextResponse.json({ id, message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading photo:', error);
    await trx.rollback();
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const photo = formData.get('photo');

    if (!id || !photo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingPhoto = await knex('category_product_photo').where('id', id).first();
    if (!existingPhoto) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'category-product-photos');
    await writeFile(path.join(uploadDir, photo.name), buffer);

    const newPhotoPath = `/uploads/category-product-photos/${photo.name}`;

    // Delete old photo
    const oldPhotoPath = path.join(process.cwd(), 'public', existingPhoto.photo_path);
    await unlink(oldPhotoPath);

    await knex('category_product_photo').where('id', id).update({
      photo_path: newPhotoPath,
    });

    return NextResponse.json({ message: 'Photo updated successfully' });
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing photo ID' }, { status: 400 });
    }

    const photo = await knex('category_product_photo').where('id', id).first();
    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Delete photo file
    const photoPath = path.join(process.cwd(), 'public', photo.photo_path);
    await unlink(photoPath);

    // Delete database record
    await knex('category_product_photo').where('id', id).del();

    return NextResponse.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}