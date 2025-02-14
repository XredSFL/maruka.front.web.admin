exports.up = function(knex) {
    return knex.schema.createTable('group_companies', function(table) {
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
    return knex.schema.dropTableIfExists('group_companies');
  };