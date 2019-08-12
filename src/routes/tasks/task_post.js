import Joi from "@hapi/joi";

import knex from "../../config/knex";

const table_name = "tasks";

export default {
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
};
