import { NextResponse } from 'next/server';
import knex from '@/lib/db';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Handle file upload
    let videoPath = null;
    const video = formData.get('video');
    if (video) {
      const bytes = await video.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Ensure the upload directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'company-profile', 'video');
      await mkdir(uploadDir, { recursive: true });

      // Generate a unique filename
      const filename = `${Date.now()}-${video.name}`;
      const filePath = path.join(uploadDir, filename);

      // Write the file
      await writeFile(filePath, buffer);
      videoPath = `/uploads/company-profile/video/${filename}`;
    }

    // Prepare data for upsert
    const companyData = {
      company_name: formData.get('companyName'),
      president_director: formData.get('presidentDirector'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      establishment: formData.get('establishment'),
      paid_capital: formData.get('paidCapital'),
      fiscal_year: formData.get('fiscalYear'),
      stock_listings: formData.get('stockListings'),
      business_bases: formData.get('businessBases'),
      main_bankers: formData.get('mainBankers'),
      employees: formData.get('employees'),
      link_map: formData.get('linkMap'),
      updated_at: knex.fn.now(),
    };

    // Upsert into database
    const result = await knex('company_profiles')
      .select('id', 'video_path')
      .first();

    let id;
    if (result) {
      // If a new video was uploaded, remove the old one
      if (videoPath && result.video_path) {
        const oldVideoPath = path.join(process.cwd(), 'public', result.video_path);
        if (fs.existsSync(oldVideoPath)) {
          await unlink(oldVideoPath);
        }
      }

      // Update existing row
      await knex('company_profiles')
        .where('id', result.id)
        .update({
          ...companyData,
          video_path: videoPath || result.video_path // Keep old path if no new video
        });
      id = result.id;
    } else {
      // Insert new row if table is empty
      [id] = await knex('company_profiles').insert({
        ...companyData,
        video_path: videoPath,
        created_at: knex.fn.now(),
      });
    }

    return NextResponse.json({ message: 'Company profile updated successfully', id });
  } catch (error) {
    console.error('Error updating company profile:', error);
    return NextResponse.json({ error: 'Failed to update company profile' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await knex('company_profiles').select('*');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching company profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch company profiles' }, { status: 500 });
  }
}