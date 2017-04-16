"use strict"
// const repl = require("repl")
// const sqlite = require("sqlite3").verbose();
//
//const repl = require("repl");
const sqlite = require("sqlite3").verbose();

// var file = "./db/student.db";
// var db = new sqlite3.Database(file);

// var CREATE_TABLEs = "CREATE TABLE IF NOT EXIST student (id INTERGER PRIMARY KEY AUTOINCREMENT, Firstname VARCHAR(50), Lastname VARCHAR(50), id_cohort varchar(10))"
// var CREATE_TABLEc = "CREATE TABLE IF NOT EXIST cohort ()"
// var SEED_DATA = "INSERT INTO students (firstname, lastname) VALUES ('Stedy', 'Yulius'), ('Riza', 'Fahmi');";

class DBModel {
  constructor(connection) {
    this.connection = new sqlite.Database(connection);
  }

  setup() {
    let db = this.connection;
    let create = "CREATE TABLE IF NOT EXISTS student (id_student INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), cohort_id INTEGER,FOREIGN KEY(cohort_id) REFERENCES cohort(id_cohort))"
    let createCohort = "CREATE TABLE IF NOT EXISTS cohort (id_cohort INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name VARCHAR(50), created_at VARCHAR(50))"
    db.serialize(function() {
      db.run(create, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Table Created student!");
        }
      });

      db.run(createCohort, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Table Created cohort!");
        }
      });
    });
  }
}




// let seedData = () => {
// db.serialize(function() {
//   db.run(SEED_DATA, function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log('successfully seed data to table students');
//       }
//     });
//   });
// }



// var replServer = repl.start('> ');

// replServer.context.createTable = createTable;
// replServer.context.seedData = seedData;
//

export default DBModel
