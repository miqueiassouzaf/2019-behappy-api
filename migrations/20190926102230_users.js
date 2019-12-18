const table_name = "users";

exports.up = function(knex) {
  return knex.schema.createTable(table_name, table => {
    table.increments("oid").primary();
    table.string("login").notNullable();
    table.string("email").nullable();
    table.string("name").nullable();
    table.string("password").nullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable(table_name);
};