const table_name = "tasks";

exports.up = function(knex, Promise) {
  return knex.schema.createTable(table_name, table => {
    table.increments("oid").primary();
    table.string("title").notNullable();
    table.string("description").nullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(table_name);
};
