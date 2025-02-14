exports.up = function(knex) {
    return knex.schema.createTable('product_models', function(table) {
      table.increments('id').primary();
      table.integer('product_id').unsigned();
      table.foreign('product_id').references('products.id');
      table.string('model_name').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('product_models');
  };