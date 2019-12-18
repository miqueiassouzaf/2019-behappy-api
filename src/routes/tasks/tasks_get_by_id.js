import { Task } from "../../models";

const response_builder = data => {
  if (data.length == undefined || data.length == 0)
    return { status: "400", data: "Gentileza não encontrada" };
  else
    return {
      status: data.length >= 1 ? "200" : "401",
      data: {
        oid: data[0].oid ? data[0].oid : 0,
        title: data[0].title ? data[0].title : "",
        description: data[0].description ? data[0].description : ""
      },
      links: [
        {
          rel: `/linkrels/tasks/${data[0].oid}/${data[0].done ? "un" : ""}done`,
          uri: `/tasks/${data[0].oid}/${data[0].done ? "un" : ""}done`
        },
        {
          rel: `/linkrels/tasks/${data[0].oid}/${
            data[0].delete ? "un" : ""
          }delete`,
          uri: `/tasks/${data[0].oid}/${data[0].delete ? "un" : ""}delete`
        }
      ]
    };
};

const responde_code_builder = data => {
  if (data.length == undefined || data.length == 0) return 400;
  else return 200;
};

export default {
  method: "GET",
  path: "/tasks/{task_id}",
  options: {
    auth: "token"
  },
  handler: (request, reply) => {
    return Task.getById(request.params.task_id).then(tasks =>
      reply.response(response_builder(tasks)).code(responde_code_builder(tasks))
    );
  }
};
