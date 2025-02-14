import { NextResponse } from 'next/server';
import knex from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { title1, description1, title2, description2 } = body;

    if (!title1 || !title2) {
      return NextResponse.json({ message: 'Title 1 and Title 2 are required' }, { status: 400 });
    }

    const existingEntry = await knex('product').first();

    let result;
    if (existingEntry) {
      result = await knex('product')
        .where({ id: existingEntry.id })
        .update({
          title1,
          description1,
          title2,
          description2,
          updated_at: knex.fn.now()
        });
    } else {
      result = await knex('product').insert({
        title1,
        description1,
        title2,
        description2
      });
    }

    return NextResponse.json({ message: 'Product information saved successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error saving Product information:', error);
    return NextResponse.json({ message: 'An error occurred while saving Product information', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const product = await knex('product').first();
    return NextResponse.json(product || {}, { status: 200 });
  } catch (error) {
    console.error('Error fetching Product information:', error);
    return NextResponse.json({ message: 'An error occurred while fetching Product information', error: error.message }, { status: 500 });
  }
}