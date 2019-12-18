import knex from "../config/knex";

const table_name = "tasks";

class Task {
  static delete(oid) {
    return knex(table_name)
      .where("oid", oid)
      .andWhere("delete", false)
      .update("delete", true)
      .then(tasks_deleted => {
        if (tasks_deleted > 0) return Task.getById(oid);
        else return [];
      })
      .catch(error => []);
  }
  static undelete(oid) {
    return knex(table_name)
      .where("oid", oid)
      .andWhere("delete", true)
      .update("delete", false)
      .then(tasks_undeleted => {
        if (tasks_undeleted > 0) return Task.getById(oid);
        else return [];
      })
      .catch(error => []);
  }

  static create(data) {
    return knex(table_name)
      .insert(data)
      .then(oid => oid)
      .catch(err => -1);
  }

  static getAll(user_oid = 0) {
    return knex
      .from(table_name)
      .select()
      .where("user", user_oid)
      .then(results => Task.deserialize(results))
      .catch(err => err);
  }

  static getById(id) {
    return knex(table_name)
      .where("oid", id)
      .select()
      .then(results => {
        if (results.length == 0) return [];
        else return Task.deserialize(results);
      })
      .catch(err => err);
  }

  static undone(id) {
    return knex(table_name)
      .where("oid", id)
      .andWhere("done", true)
      .update("done", false)
      .then(tasks_updated => {
        if (tasks_updated > 0) return Task.getById(id);
        else return [];
      });
  }

  static done(id) {
    return knex(table_name)
      .where("oid", id)
      .andWhere("done", false)
      .update("done", true)
      .then(tasks_updated => {
        if (tasks_updated > 0) return Task.getById(id);
        else return [];
      });
  }

  static deserialize(json) {
    if (json.length == undefined || json.length == 0) return {};
    return json.map(data => {
      let task = new Task();
      task.oid = data.oid ? data.oid : 0;
      task.title = data.title ? data.title : "";
      task.description = data.description ? data.description : "";
      task.done = data.done ? true : false;
      task.delete = data.delete ? true : false;
      return task;
    });
  }
}

export default Task;
