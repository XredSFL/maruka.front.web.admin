import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda

export async function GET() {
  try {
    const rows = await knex('category_products').select('*');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching category products:', error);
    return NextResponse.json({ error: 'Failed to fetch category products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, totalProduct } = await request.json();

    const [id] = await knex('category_products').insert({
      name,
      total_product: totalProduct
    });

    return NextResponse.json({ message: 'Category added successfully', id });
  } catch (error) {
    console.error('Error adding category product:', error);
    return NextResponse.json({ error: 'Failed to add category product' }, { status: 500 });
  }
}