"use strict"
const repl = require('repl')
const sqlite3 = require('sqlite3').verbose()

class DBModel {
  constructor(file) {
    this.connection = new sqlite3.Database(file)
  }
  setup() {
    let db = this.connection,
        CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL UNIQUE, last_name TEXT, cohort_id, FOREIGN KEY(cohort_id) REFERENCES cohort(id))",
        CREATE_TABLE_COHORT = "CREATE TABLE IF NOT EXISTS cohort(id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name)"

    db.serialize( () => {
      db.run(CREATE_TABLE_STUDENT, (err) => {
        if(!err) {
          console.log(`table student berhasil dibuat`);
        } else {
          console.log(err.message);
        }
      })
      db.run(CREATE_TABLE_COHORT, (err) => {
        if(!err) {
          console.log(`table cohort berhasil dibuat`);
        } else {
          console.log(err.message);
        }
      })
    })

  }

}

export default DBModel
