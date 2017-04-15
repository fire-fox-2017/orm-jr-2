"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
import * as Repl from "repl"

let db = new DBModel('db/student.db');
// let db = new DBModel("db/test.db");

// Student.findOrCreate(dbModel.connection, new Student("Windiana", "Krismanuyar", 1))


// Student.findAll(dbModel.connection, {limit: 2, offset: 1}, function(err, data){
//     if(!err){
//       for(var i=0; i<data.length; ){
//         console.log(data[i]);
//       }
//     } else {
//     console.log('error')
//       }
//   })

let argv = process.argv;
if (argv[2] === 'playtime') {
  let repl = Repl.start('Command Here>');
  repl.context.dbModel = db;
  repl.context.Student = Student;
  repl.context.Cohort  = Cohort;
}