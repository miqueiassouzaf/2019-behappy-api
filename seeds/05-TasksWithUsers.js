const table_name = "tasks";
const user_table_name = "users";

exports.seed = function(knex) {
  return knex(table_name).then(function() {
    return knex(user_table_name)
      .where("login", "testador")
      .first("oid")
      .then(user => knex(table_name).update("user", user.oid));
  });
};
