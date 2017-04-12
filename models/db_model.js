"use strict"

const sqlite = require('sqlite3').verbose();


class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file);
  }
  setup(){
    let obj = this
    this.connection.serialize(function(){
      obj.connection.run('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER);', function(err){
        if (err) {
          console.log(err.message);
        } else {
          console.log('Create table students success');
        }
      })
      obj.connection.run('CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);', function(err){
        if (err) {
          console.log(err.message);
        } else {
          console.log('Create table cohorts success');
        }
      })
    })
  }
}

export default DBModel
