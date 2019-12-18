const root = {
  method: "GET",
  path: "/",
  handler: (request, reply) => ({
    version: "0.0.1",
    title: "API do App Lista de tarefas"
  })
};

export default root;
