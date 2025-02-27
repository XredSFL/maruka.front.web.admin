exports.up = function(knex) {
    return knex.schema.createTable('company_profiles', function(table) {
      table.increments('id').primary();
      table.string('company_name').notNullable();
      table.string('president_director');
      table.string('phone');
      table.date('establishment');
      table.string('paid_capital');
      table.string('address');
      table.string('fiscal_year');
      table.string('stock_listings');
      table.string('business_bases');
      table.string('main_bankers');
      table.string('employees');
      table.string('link_map');
      table.string('video_path');
      table.timestamps(true, true);
  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('company_profiles');
  };