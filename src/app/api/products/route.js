// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const trx = await knex.transaction();
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const category_id = formData.get('category_id');
    const description = formData.get('description');
    const models = formData.getAll('models[]');
    const mediaFiles = formData.getAll('media[]');

    // Insert product
    const [productId] = await trx('products').insert({
      name,
      category_id,
      description
    });

    // Insert models
    for (const model of models) {
      if (model.trim() !== '') {  // Only insert non-empty models
        await trx('product_models').insert({
          product_id: productId,
          model_name: model.trim()
        });
      }
    }

    // Process and insert media files
    for (const file of mediaFiles) {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const filepath = path.join(process.cwd(), 'public', 'uploads', 'products', filename);
      
      await writeFile(filepath, bytes);
      
      await trx('product_media').insert({
        product_id: productId,
        file_path: `/uploads/products/${filename}`,
        file_type: file.type
      });
    }

    // Commit transaction
    await trx.commit();

    return NextResponse.json({ message: 'Product created successfully', productId }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    await trx.rollback();
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await knex('products as p')
      .select(
        'p.*',
        'cp.name as category_name',
        knex.raw('GROUP_CONCAT(DISTINCT pm.model_name) AS models'),
        knex.raw('GROUP_CONCAT(DISTINCT pmed.file_path) AS media_paths')
      )
      .leftJoin('product_models as pm', 'p.id', 'pm.product_id')
      .leftJoin('product_media as pmed', 'p.id', 'pmed.product_id')
      .join('category_products as cp', 'p.category_id', 'cp.id')
      .groupBy('p.id');

    console.log(products);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}