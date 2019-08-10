import knex from "../../config/knex";

const table_name = "tasks";

export default {
  method: "GET",
  path: "/tasks",
  handler: (request, reply) =>
    knex
      .from(table_name)
      .select("oid", "title", "description")
      .then(results => reply.response(results))
      .catch(err => reply.response(err))
};
