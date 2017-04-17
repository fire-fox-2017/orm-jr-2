"use strict"

import Student from "./student.js";

const sqlite = require('sqlite3').verbose();

class Cohort {
  constructor(name, id = null) {
    this.name = name;
    this.id = id;
  }

  static findAll(connection, callback) {
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `SELECT * FROM cohorts`;
    db.serialize(() => {
      db.all(query, (err, rows) => {
        callback(rows, err);
      });
    });
  }

  static where(connection, string, callback) {
    let searchArr = string.split(" = ");
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `SELECT * FROM cohorts WHERE ${searchArr[0]} = ${searchArr[1]}`;
    db.serialize(() => {
      db.all(query, (err, rows) => {
        callback(rows, err);
      });
    });
  }

  static findOrCreate(connection, cohortObj) {
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `INSERT INTO cohorts (name) VALUES ('${cohortObj.name}')`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          db.get(`SELECT * FROM cohorts WHERE name = '${cohortObj.name}'`, (err, row) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`A record with first_name = '${cohortObj.name}' is found.`);
              console.log(JSON.stringify(row));
            }
          });
        } else {
          console.log(`Cohort has been succesfully created.`);
        }
      });
    });
  }

  static create(connection, cohortObj) {
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `INSERT INTO cohorts (name) VALUES ('${cohortObj.name}')`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          console.log(`Error has occured when inserting cohort to database, please check to the following error:`);
          console.log(err);
        } else {
          console.log(`Cohort has been succesfully appended.`);
        }
      });
    });
  }

  static update(connection, newCohortObj) {
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `UPDATE cohorts SET name = '${newCohortObj.name}' WHERE id = '${newCohortObj.id}'`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          console.log(`Error has occured when updating cohort data, please check to the following error:`);
          console.log(err);
        } else {
          console.log(`Cohort has been succesfully updated.`);
        }
      });
    });
  }

  static delete(connection, cohortId) {
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `DELETE FROM cohorts WHERE id = '${cohortId}'`;
    db.serialize(() => {
      db.run(query, (err) => {
        if(err) {
          console.log(`Error has occured when deleting cohort data, please check to the following error:`);
          console.log(err);
        } else {
          console.log(`Cohort has been succesfully deleted.`);
        }
      });
    });
  }

  static findById(connection, cohortId) {
    let file = connection.filename;
    let db = new sqlite.Database(file);
    let query = `SELECT * FROM cohorts WHERE id = '${cohortId}'`;
    db.serialize(() => {
      db.each(query, (err, row) => {
        if(err) {
          console.log(`Error has occured when searching cohort data, please check to the following error:`);
          console.log(err);
        } else {
          console.log(JSON.stringify(row));
        }
      });
    });
  }

}

export default Cohort
