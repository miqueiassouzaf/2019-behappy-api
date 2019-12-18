bcrypt = require("bcrypt");

const table_name = "users";
const salt = bcrypt.genSaltSync();

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(table_name).del()
    .then(function () {
      // Inserts seed entries
      return knex(table_name).insert([
        {
          login: "testador", 
          email: "testador@gmail.com", 
          name: "Testador fake", 
          password: bcrypt.hashSync("secret", salt)
        },
        {
          login: "professor", 
          email: "professor@gmail.com", 
          name: "Professor fake", 
          password: bcrypt.hashSync("s3cr3t", salt)
        },
        {
          login: "aluno", 
          email: "aluno@gmail.com", 
          name: "Aluno fake", 
          password: bcrypt.hashSync("53cr3t", salt)
        }
      ]);
    });
};