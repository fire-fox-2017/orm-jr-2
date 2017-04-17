"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/student.db');

class DBModel {
  constructor(options) {
    this.connection=db;
  }

  setup(){
    var file = this._file;
    console.log(file)

    var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL UNIQUE, lastname TEXT, id_cohort INTEGER);";
    db.serialize(function() {
        db.run(CREATE_TABLE, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('CREATE TABLE students');
            }
        });
    });
    var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);";
    db.serialize(function() {
        db.run(CREATE_TABLE, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('CREATE TABLE cohorts');
            }
        });
    });
  }
}





export default DBModel
