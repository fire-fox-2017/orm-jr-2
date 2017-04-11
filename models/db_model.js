"use strict"



class DBModel {
  constructor (db_file) {
    const sqlite = require('sqlite3').verbose();
    this.filename = db_file;
    this.connection = new sqlite.Database(this.filename);
  }

  setup() {
    let db = this.connection;

    // create table cohort
    let create_table_cohort_str = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL)`;

    db.serialize(function () {
      db.run(create_table_cohort_str, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Created TABLE Cohorts Successfully.');
        }
      });
    });

    // create table student
    let create_table_student_str = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, cohort_id INTEGER, FOREIGN KEY(cohort_id) references cohorts(id) )`;

    db.serialize(function () {
      db.run(create_table_student_str, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Created TABLE Students Successfully.');
        }
      });
    });


  } // end of setup()


}

export default DBModel
