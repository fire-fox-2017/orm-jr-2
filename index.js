"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
import * as Repl from "repl"

let db = new DBModel('db/student.db');
// let db = new DBModel("db/test.db");

// Student.findOrCreate(dbModel.connection, new Student("Windiana", "Krismanuyar", 1))
// Cohort.findOrCreate(dbModel.connection, new Cohort('Firefox'));

// Student.findAll(dbModel.connection, {limit: 2, offset: 1}, function(err, data){
//     if(!err){
//       for(var i=0; i<data.length; ){
//         console.log(data[i]);
//       }
//     } else {
//     console.log('error')
//       }
//   })

// Cohort.findAllOffset(db.connection, {limit:2 , offset: 1},function(data, err) {
//   if(!err) {
//     for(var i=0 ; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log('Error');
//   }
// })

let argv = process.argv;
if (argv[2] === 'playtime') {
  let repl = Repl.start('Command Here>');
  repl.context.dbModel = db;
  repl.context.Student = Student;
  repl.context.Cohort  = Cohort;
}