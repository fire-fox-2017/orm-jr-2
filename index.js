"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let repl = require("repl");
let replServer = repl.start({prompt: "> "});
let dbModel = new DBModel ("db/student.db")
replServer.context.dbModel = dbModel

replServer.context.Student = Student;

// Student.findAll(dbModel.connection,{limit: 2, offset: 1}), function(data,err){
//   if(!err){
//     for(var i =0; i < data.length; i++){
//       console.log(data[i]);
//     } else {
//       console.log("Error");
//     }
//   }
// })


// Student.findOrCreate(dbModel.connection, new Student("Windiana", "Krismanuyar",1))

//Cohort.findAll(dbModel.connection,{limit: 2, offset: 1}), function(data,err) {
//   if(!err){
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i]);
//     } else {
//         console.log("Error");
//       }
//     }
//   }
// })


// Cohort.findOrCreate(dbModel.connection, new Cohort("Windiana", "Krismanuyar",1))
