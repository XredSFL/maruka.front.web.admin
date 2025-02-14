import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const formData = await request.formData();
    
    const companyName = formData.get('companyName');
    const address = formData.get('address');
    const linkMap = formData.get('linkMap');
    const description = formData.get('description');
    const photo = formData.get('photo');

    // Prepare update object
    const updateData = {
      company_name: companyName,
      address,
      link_map: linkMap,
      description,
      updated_at: knex.fn.now()
    };

    // Handle photo upload if a new photo is provided
    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Ensure the upload directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'group-companies');
      await mkdir(uploadDir, { recursive: true });

      const filename = `${Date.now()}-${photo.name}`;
      await writeFile(path.join(uploadDir, filename), buffer);

      const photoPath = `/uploads/group-companies/${filename}`;
      updateData.photo = photoPath;

      // Delete old photo if exists
      const oldPhoto = await knex('group_companies').where({ id }).first('photo');
      if (oldPhoto && oldPhoto.photo) {
        const oldPhotoPath = path.join(process.cwd(), 'public', oldPhoto.photo);
        try {
          await unlink(oldPhotoPath);
        } catch (unlinkError) {
          console.error('Error deleting old photo:', unlinkError);
          // Continue even if old photo deletion fails
        }
      }
    }

    // Update the database
    await knex('group_companies')
      .where({ id })
      .update(updateData);

    return NextResponse.json({ message: 'Group company updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating group company:', error);
    return NextResponse.json({ error: 'Failed to update group company' }, { status: 500 });
  }
}