exports.up = function(knex) {
    return knex.schema.createTable('company_profiles', function(table) {
      table.increments('id').primary();
      table.string('company_name').notNullable();
      table.text('address');
      table.string('link_map');
      table.text('description');
      table.string('photo');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('company_profiles');
  };