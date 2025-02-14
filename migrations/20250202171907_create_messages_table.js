exports.up = function(knex) {
    return knex.schema.createTable('messages', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('no_phone');
      table.string('email');
      table.text('messages');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
  };