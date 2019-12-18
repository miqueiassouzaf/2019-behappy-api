import { User } from "../../models";

export default {
  method: ["GET", "POST"],
  path: "/auth",
  options: {
    auth: "simple"
  },
  handler: (request, reply) => request.auth.credentials
};
