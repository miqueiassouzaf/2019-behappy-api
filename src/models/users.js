import bcrypt from "bcrypt";

import knex from "../config/knex";

const table_name = "users";

class User {
    static login(username, password) {
        return knex(table_name).select().where('login', username).then(users => {           
            if (users == undefined || users.length == undefined || users.length == 0) return undefined;
            if (bcrypt.compareSync(password, users[0].password)) return users[0];
            return undefined;
        });
    }
}

export default User;