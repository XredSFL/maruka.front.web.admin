import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    await knex('category_products')
      .where({ id })
      .update({ name: body.name,
        total_product: body.total_product,
       });

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  console.log(params);

  try {
    await knex.transaction(async (trx) => {
      await trx('category_products').where({ id }).del();
    }
    );

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}