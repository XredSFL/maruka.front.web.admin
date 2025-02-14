// src/app/api/contact-us/route.js

import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Make sure this points to your Knex configuration

export async function POST(req) {
  try {
    const body = await req.json();
    const { title1, title2, description, address, phone, email } = body;

    // Validate input
    if (!title1 || !title2) {
      return NextResponse.json({ message: 'Title 1 and Title 2 are required' }, { status: 400 });
    }

    // Check if a contact us entry already exists
    const existingEntry = await knex('contact_us').first();

    let result;
    if (existingEntry) {
      // Update existing entry
      result = await knex('contact_us')
        .where({ id: existingEntry.id })
        .update({
          title1,
          title2,
          description,
          address,
          phone,
          email,
          updated_at: knex.fn.now()
        });
    } else {
      // Insert new entry
      result = await knex('contact_us').insert({
        title1,
        title2,
        description,
        address,
        phone,
        email
      });
    }

    return NextResponse.json({ message: 'Contact Us information saved successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error saving Contact Us information:', error);
    return NextResponse.json({ message: 'An error occurred while saving Contact Us information', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contactUs = await knex('contact_us').first();
    return NextResponse.json(contactUs || {}, { status: 200 });
  } catch (error) {
    console.error('Error fetching Contact Us information:', error);
    return NextResponse.json({ message: 'An error occurred while fetching Contact Us information', error: error.message }, { status: 500 });
  }
}