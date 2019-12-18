import knex from "../config/knex";

const table_name = "who";

class Who {
  static getAll() {
    return knex
      .from(table_name)
      .select()
      .then(results => Who.deserialize(results))
      .catch(err => err);
  }

  static deserialize(json) {
    if (json.length == undefined || json.length == 0) return {};
    return json.map(data => {
      let who = new Who();
      who.oid = data.oid ? data.oid : 0;
      who.title = data.title ? data.title : "";
      who.image_index = data.image_index ? data.image_index : 0;
      return who;
    });
  }
}

export default Who;