exports.up = function(knex) {
    return knex.schema.createTable('category_products', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('total_product').defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('category_products');
  };