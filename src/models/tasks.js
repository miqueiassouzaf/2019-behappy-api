import knex from "../config/knex";
import { EILSEQ } from "constants";

const table_name = "tasks";

class Task {
  static getAll() {
    return knex
      .from(table_name)
      .select("oid", "title", "description")
      .then(results => Task.deserialize(results))
      .catch(err => err);
  }

  static getById(id) {
    return knex(table_name)
      .where("oid", id)
      .select()
      .then(results => Task.deserialize(results))
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
    return json.map(data => {
      let task = new Task();
      task.oid = data.oid ? data.oid : 0;
      task.title = data.title ? data.title : "";
      task.done = data.done ? data.done : false;
      task.delete = data.delete ? data.delete : false;
      return task;
    });
  }
}

export default Task;
