exports.up = function(knex) {
    return knex.schema.createTable('landing_page_sections', function(table) {
      table.increments('id').primary();
      table.string('page').notNullable();
      table.string('title');
      table.text('description');
      table.string('client_title');
      table.string('photo');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('landing_page_sections');
  };