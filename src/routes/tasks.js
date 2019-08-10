import Joi from "@hapi/joi";

import knex from "../config/knex";

const tasks_route = [
  {
    method: "GET",
    path: "/tasks",
    handler: (request, reply) =>
      knex
        .from("tasks")
        .select("oid", "title", "description")
        .then(results => reply.response(results))
        .catch(err => reply.response(err))
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (request, reply) =>
      knex("tasks")
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
  }
];

export default tasks_route;
