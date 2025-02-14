exports.up = function(knex) {
    return knex.schema.createTable('product_media', function(table) {
      table.increments('id').primary();
      table.integer('product_id').unsigned();
      table.foreign('product_id').references('products.id');
      table.string('file_path').notNullable();
      table.string('file_type').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('product_media');
  };