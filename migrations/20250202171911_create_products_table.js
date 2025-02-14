exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('category_products.id');
      table.text('description');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };