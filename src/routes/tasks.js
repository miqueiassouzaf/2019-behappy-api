import Joi from "@hapi/joi";

import knex from "../config/knex";

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

const tasks_route = [
  {
    method: "GET",
    path: "/tasks",
    handler: (request, reply) =>
      knex
        .from(table_name)
        .select("oid", "title", "description")
        .then(results => reply.response(results))
        .catch(err => console.log(err))
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (request, reply) =>
      knex(table_name)
        .insert(request.payload)
        .then(oid =>
          reply
            .response({
              status: 201,
              task: {
                oid: oid[0],
                title: request.payload.title,
                description: request.payload.description
              },
              links: [
                {
                  rel: `/linkrels/tasks/${oid[0]}/show`,
                  uri: `/tasks/${oid[0]}`
                },
                {
                  rel: `/linkrels/tasks/${oid[0]}/delete`,
                  uri: `/tasks/${oid[0]}`
                },
                {
                  rel: `/linkrels/tasks/${oid[0]}/done`,
                  uri: `/tasks/${oid[0]}/done`
                }
              ]
            })
            .code(201)
        )
        .catch(err => reply.response(err)),
    options: {
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required()
        }),
        headers: {
          "content-type": Joi.string().required()
        },
        options: {
          allowUnknown: true
        }
      }
    }
  },
  {
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
  }
];

export default tasks_route;
