"use strict"

const sqlite = require('sqlite3').verbose();
const file = './db/student.db';
// const file = './db/test.db';
// const repl = require('repl');

const db = new sqlite.Database(file)


class DBModel {
  constructor() {
    this.connection = db
  }
  setup(){
    db.serialize(()=>{
      let query = `CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER, foreign key (cohort_id) references cohorts(id));`
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        } else {
          console.log(`Create Table Student Sucess`);
        }
      })
    })
    db.serialize(()=>{
      let query = `CREATE TABLE IF NOT EXISTS Cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`
      db.run(query, (err)=>{
        if(err){
          console.log(err);
        } else {
          console.log(`Create Table Student Sucess`);
        }
      })
    })
  }
}

export default DBModel
