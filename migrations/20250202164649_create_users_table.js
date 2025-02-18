// migrations/YYYYMMDDHHMMSS_create_users_table.js

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('phone', 20);
      table.string('email', 50).unique();
      table.string('password');
      table.string('country', 100);
      table.enu('status', ['active', 'inactive']).defaultTo('active');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };