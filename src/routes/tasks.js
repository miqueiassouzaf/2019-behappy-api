import knex from "../config/knex";

const tasks_route = {
  method: "GET",
  path: "/tasks",
  handler: (request, reply) =>
    knex
      .from("tasks")
      .select("oid", "title", "description")
      .then(results => reply.response(results))
      .catch(err => console.log(err))
};

export default tasks_route;
