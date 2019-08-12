import { Task } from "../../models";

const response_builder = data => {
  let response = {
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
  return response;
};
export default {
  method: "GET",
  path: "/tasks/{task_id}",
  handler: (request, reply) => {
    return Task.getById(request.params.task_id).then(tasks =>
      reply.response(response_builder(tasks))
    );
  }
};
