import knex from "../config/knex";

const table_name = "what";

class What {
  static getAll() {
    return knex
      .from(table_name)
      .select()
      .then(results => What.deserialize(results))
      .catch(err => err);
  }

  static deserialize(json) {
    if (json.length == undefined || json.length == 0) return {};
    return json.map(data => {
      let what = new What();
      what.oid = data.oid ? data.oid : 0;
      what.title = data.title ? data.title : "";
      what.image_index = data.image_index ? data.image_index : 0;
      return what;
    });
  }
}

export default What;