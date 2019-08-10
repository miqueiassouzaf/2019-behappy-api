const table_name = "tasks";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table_name)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table_name).insert([
        {
          title: "Bom dia",
          description: "Você deu bom dia para alguém há 44 dias",
          what: 2,
          who: 6
        },
        {
          title: "Ligação",
          description: "Você ligou para seus amigos há 44 dias",
          what: 3,
          who: 4
        },
        {
          title: "Zap",
          description: "Envie um zap aos seus pais em 6 horas",
          what: 1,
          who: 1
        }
      ]);
    });
};
