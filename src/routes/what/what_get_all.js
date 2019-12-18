import { What } from "../../models";

export default {
  method: "GET",
  path: "/what",
  handler: (request, reply) => What.getAll()
};