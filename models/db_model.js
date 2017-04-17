"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = './db/student.db';
let db = new sqlite.Database(file);

class DBModel {
  constructor() {
    this.connection = db;
  }

  setup() {

    db.serialize(() => {
      db.run("CREATE TABLE cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)", (err) => {
        if(err) {
          console.log('TABLE ALREADY EXISTS');
        } else {
          console.log('CREATE TABLE: COHORTS success');
        }
      })
    });

    db.serialize(() => {
      db.run("CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL UNIQUE, last_name TEXT, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts(id))", (err) => {
        if(err) {
          console.log('TABLE ALREADY EXISTS');
        } else {
          console.log('CREATE TABLE: STUDENTS success');
        }
      })
    });

  }

}

export default DBModel
