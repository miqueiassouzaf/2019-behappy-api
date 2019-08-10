import Hapi from "@hapi/hapi";

const server = new Hapi.Server({
  port: process.env.PORT || 8000,
  debug: { request: ["*"] }
});

const init = async () => {
  await server.register({
    plugin: require("hapi-router"),
    options: {
      routes: "src/routes/**/*.js"
    }
  });

  await server.start();
  console.log("Server is running");
  console.log(server.info);
};

init();
