import { Task } from "../../models";

const response_builder = data => {
  let response = {};
  if (data.length > 0)
    response = {
      status: "200",
      data: {
        oid: data[0].oid ? data[0].oid : 0,
        title: data[0].title ? data[0].title : "",
        description: data[0].description ? data[0].description : ""
      },
      links: [
        {
          rel: `/linkrels/tasks/${data[0].oid}/undone`,
          uri: `/tasks/${data[0].oid}/undone`
        }
      ]
    };
  else
    response = {
      status: "406",
      data: "Gentileza não foi marcada como feita"
    };
  return response;
};

const response_code_builder = data => (data.length > 0 ? 200 : 406);

export default {
  method: "POST",
  path: "/tasks/{task_id}/done",
  handler: (request, reply) => {
    return Task.done(request.params.task_id).then(data => {
      return reply
        .response(response_builder(data))
        .code(response_code_builder(data));
    });
  }
};
