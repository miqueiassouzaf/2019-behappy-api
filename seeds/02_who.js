const table_name = "who";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table_name).del()
    .then(function () {
      // Inserts seed entries
      return knex(table_name).insert([
        {title: 'Pais', image_index: 0},
        {title: 'Filhos', image_index: 1},
        {title: 'Cônjuges', image_index: 2},
        {title: 'Amigos', image_index: 3},
        {title: 'Pets', image_index: 4},
        {title: 'Outros', image_index: 5}
      ]);
    });
};