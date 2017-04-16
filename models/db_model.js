"use strict"

const sqlite = require('sqlite3').verbose();

let file = './db/student.db';
var db = new sqlite.Database(file);

class DBModel {
  constructor(){
    this.connection = db;
  }

  setup(){
    var CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, id_cohort INTEGER, FOREIGN KEY(id_cohort) REFERENCES cohort(id))";
    var CREATE_TABLE_COHORT = "CREATE TABLE IF NOT EXISTS cohort(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"

      db.serialize(function(){
        db.run(CREATE_TABLE_COHORT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log('CREATE TABLE COHORT SUKSES');
          }
        });

        db.run(CREATE_TABLE_STUDENT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log('CREATE TABLE STUDENT SUKSES');
          }
        });
      });
  }

}

export default DBModel
