const table_name = "tasks";

exports.up = function(knex, Promise) {
  return knex.schema.alterTable(table_name, table => {
    table
      .integer("user")
      .notNullable()
      .default(0);
    table.foreign("user").references("users.oid");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable(table_name, table => {
    table.dropColumn("user");
  });
};
