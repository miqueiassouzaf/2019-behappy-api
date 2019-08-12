import { Task } from "../../models";

export default {
  method: "GET",
  path: "/tasks",
  handler: (request, reply) => Task.getAll()
};
