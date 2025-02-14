exports.up = function(knex) {
    return knex.schema.createTable('contact_us', function(table) {
      table.increments('id').primary();
      table.string('title1', 255).notNullable();
      table.string('title2', 255).notNullable();
      table.text('description');
      table.string('address', 255);
      table.string('phone', 50);
      table.string('email', 255);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contact_us');
  };