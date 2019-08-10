import knex from "../../config/knex";

const table_name = "tasks";

const delete_response = (result, task_id) => {
  let response = { data: ":D" };
  if (result == 1) {
    response = {
      status: "200",
      data: "Gentileza apagada",
      links: [
        {
          rel: `/linkrels/tasks/${task_id}/undelete`,
          uri: `/tasks/${task_id}/undelete`
        }
      ]
    };
  } else {
    response = {
      status: "400",
      data: "No data to delete"
    };
  }
  return response;
};

const delete_response_code = result => (result == 1 ? 200 : 400);

export default {
  method: "DELETE",
  path: "/tasks/{task_id}",
  handler: (request, reply) =>
    knex(table_name)
      .where("oid", request.params.task_id)
      .del()
      .then(results =>
        reply
          .response(delete_response(results, request.params.task_id))
          .code(delete_response_code(results))
      )
      .catch(error => {
        reply.response(delete_response(0, 0)).code(400);
      })
};
