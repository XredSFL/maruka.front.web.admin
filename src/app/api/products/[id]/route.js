import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini menunjuk ke konfigurasi Knex Anda

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    await knex('products')
      .where({ id })
      .update({ name: body.name });

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await knex.transaction(async (trx) => {
      // Delete related records first
      await trx('product_models').where({ product_id: id }).del();
      await trx('product_media').where({ product_id: id }).del();

      // Then delete the product
      await trx('products').where({ id }).del();
    });

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}