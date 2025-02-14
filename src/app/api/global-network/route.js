// Asumsikan ini adalah file src/app/api/global-network/route.js

import { NextResponse } from 'next/server';
import knex from '@/lib/db'; // Pastikan ini sesuai dengan setup database Anda

export async function GET() {
  try {
    // Query untuk mendapatkan data global network
    const globalNetworks = await knex('global_networks')
      .select('global_networks.id', 'global_networks.continent', 'global_networks.region', 'global_networks.country', 'global_networks.group_company_id', 'group_companies.company_name as group_company_name')
        .join('group_companies', 'global_networks.group_company_id', 'group_companies.id');

    // Query untuk mendapatkan data perusahaan terkait
    const companies = await knex('companies')
      .select('global_network_id', 'company_name', 'address', 'phone', 'fax');

    // Membuat map untuk menyimpan data global network berdasarkan id
    const networkMap = globalNetworks.reduce((acc, network) => {
      acc[network.id] = {
        continent: network.continent,
        region: network.region,
        country: network.country,
        group_company_id: network.group_company_id,
        group_company_name: network.group_company_name,
        companies: []
      };
      return acc;
    }, {});

    // Mengelompokkan perusahaan ke dalam global network yang sesuai
    companies.forEach(company => {
      if (networkMap[company.global_network_id]) {
        networkMap[company.global_network_id].companies.push({
          company_name: company.company_name,
          address: company.address,
          phone: company.phone,
          fax: company.fax
        });
      }
    });

    // Mengonversi map kembali menjadi array
    const result = Object.values(networkMap);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching global network data:', error);
    return NextResponse.json({ error: 'Failed to fetch global network data' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { continent, region, country, group, companies } = data;

    // Simpan data ke database
    await Promise.all(companies.map(company => 
      knex('global_networks').insert({
        continent,
        region,
        country,
        group,
        company_name: company.companyName,
        address: company.address,
        phone: company.phone,
        fax: company.fax
      })
    ));

    return NextResponse.json({ message: 'Global network data saved successfully' });
  } catch (error) {
    console.error('Error saving global network data:', error);
    return NextResponse.json({ error: 'Failed to save global network data' }, { status: 500 });
  }
}