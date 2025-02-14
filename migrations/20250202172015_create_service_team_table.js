exports.up = function(knex) {
    return knex.schema.createTable('service_team', function(table) {
      table.increments('id').primary();
      table.string('service_team_name').notNullable();
      table.text('description');
      table.string('photo');
      table.string('pdf');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('service_team');
  };