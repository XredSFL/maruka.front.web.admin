// migrations/20250204012743_create_category_product_photo_table.js

exports.up = function(knex) {
    return knex.schema.createTable('category_product_photo', function(table) {
      table.increments('id').primary();
      table.integer('category_product_id').unsigned();
      table.string('photo_path', 255).notNullable();
      table.timestamps(true, true);
  
      // Foreign key constraint
    //   table.foreign('category_product_id').references('id').inTable('category_products').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('category_product_photo');
  };