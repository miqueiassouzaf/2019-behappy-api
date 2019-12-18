import Joi from "@hapi/joi";

import Task from "../../models/tasks";

const response_message_builder = (data, oid) => {
  return {
    status: 201,
    task: {
      oid: oid,
      title: data.title,
      description: data.description
    },
    links: [
      {
        rel: `/linkrels/tasks/${oid}/show`,
        uri: `/tasks/${oid}`
      },
      {
        rel: `/linkrels/tasks/${oid}/delete`,
        uri: `/tasks/${oid}`
      },
      {
        rel: `/linkrels/tasks/${oid}/done`,
        uri: `/tasks/${oid}/done`
      }
    ]
  };
};

export default {
  method: "POST",
  path: "/tasks",
  handler: (request, reply) => {
    return Task.create(request.payload).then(oid =>
      reply.response(response_message_builder(request.payload, oid)).code(201)
    );
  },
  options: {
    auth: "token",
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
