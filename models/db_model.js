"use strict"

const sqlite = require('sqlite3').verbose();

class DBModel {
  constructor (filename) {
    this.connection = new sqlite.Database(filename);
    this.filename = filename;
  }

  setup () {
    var db = new sqlite.Database(this.filename);
    db.serialize(function () {
      db.run(`CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL);`, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Create table cohorts success`);
        }
      });
    });
    db.serialize(function () {
      db.run(`CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50), cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts(id));`, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Create table students success`);
        }
      });
    });

  }
}

export default DBModel
