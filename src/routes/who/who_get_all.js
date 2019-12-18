import { Who } from "../../models";

export default {
  method: "GET",
  path: "/who",
  handler: (request, reply) => Who.getAll()
};