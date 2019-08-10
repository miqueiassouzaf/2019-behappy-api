const table_name = "tasks";

exports.up = function(knex, Promise) {
  return knex.schema.alterTable(table_name, table => {
    table
      .integer("what")
      .notNullable()
      .default(0);
    table
      .integer("who")
      .notNullable()
      .default(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable(table_name, table => {
    table.dropColumn("what").dropColumn("who");
  });
};
