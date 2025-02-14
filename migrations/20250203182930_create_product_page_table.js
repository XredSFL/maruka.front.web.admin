exports.up = function(knex) {
    return knex.schema.createTable('product', function(table) {
      table.increments('id').primary();
      table.string('title1', 255).notNullable();
      table.text('description1');
      table.string('title2', 255).notNullable();
      table.text('description2');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('product');
  };