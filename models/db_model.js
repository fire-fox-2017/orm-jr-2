"use strict"
const sqlite = require('sqlite3').verbose();

class DBModel {
  constructor(fileName){
    this.connection = new sqlite.Database(fileName)
  }

  setup(){
    let db = this.connection
    let CREATE_TABEL_COHORTS = "CREATE TABLE IF NOT EXISTS cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
    
    let CREATE_TABEL_STUDENT = "CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, cohort_id INTEGER ,FOREIGN KEY(cohort_id) REFERENCES cohorts(id))"

    db.serialize(function(){
      db.run(CREATE_TABEL_STUDENT, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(`Student table created!`);
        }
      })

      db.run(CREATE_TABEL_COHORTS, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log(`Cohort table was created!`);
        }
      })
    })
  }

}

export default DBModel
