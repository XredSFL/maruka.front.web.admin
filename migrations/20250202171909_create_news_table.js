exports.up = function(knex) {
    return knex.schema.createTable('news', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('news');
      table.string('photo');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('news');
  };