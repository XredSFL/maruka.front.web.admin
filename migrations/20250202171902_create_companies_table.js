exports.up = function(knex) {
    return knex.schema.createTable('companies', function(table) {
      table.increments('id').primary();
      table.string('company_name').notNullable();
      table.text('address');
      table.string('phone');
      table.string('fax');
      table.integer('global_network_id');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('companies');
  };