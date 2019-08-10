const table_name = "what";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table_name)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table_name).insert([
        { title: "Zap", image_index: 0 },
        { title: "Bom dia", image_index: 1 },
        { title: "Ligação", image_index: 2 },
        { title: "Aperto de mão", image_index: 3 },
        { title: "Abraço", image_index: 4 },
        { title: "Doce", image_index: 5 },
        { title: "Presente", image_index: 6 }
      ]);
    });
};
