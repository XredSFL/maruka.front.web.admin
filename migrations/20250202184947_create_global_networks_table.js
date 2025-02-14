// Nama file: YYYYMMDDHHMMSS_create_global_networks_table.js
// (ganti YYYYMMDDHHMMSS dengan timestamp saat ini)

exports.up = function(knex) {
    return knex.schema.createTable('global_networks', function(table) {
      table.increments('id').primary();
      table.string('continent').notNullable();
      table.string('region').notNullable();
      table.string('country').notNullable();
      table.integer('group_company_id').unsigned().notNullable();
      table.foreign('group_company_id').references('id').inTable('group_companies');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('global_networks');
  };