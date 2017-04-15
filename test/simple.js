'use strict'

import DBModel from "../models/db_model.js";
import Student from "../models/student.js";
import Cohort from "../models/cohort.js";

const sqlite = require('sqlite3').verbose();

var dbModel = new DBModel('../db/test.db');
dbModel.setup();
console.log(dbModel.connection);

// Student.create(dbModel.connection, new Student('Roberto','Firmino', 2));
// let testCreate = `SELECT * FROM Students WHERE firstname = 'Roberto' AND lastname = 'Firmino' AND cohort_id = 2`
// dbModel.connection.each(testCreate,(err,row)=>{
//   if(typeof row == 'object'){
//     console.log(`Test create student : success`);
//   }
// });

// Student.update(dbModel.connection, new Student('Roberto', 'Asalamakete', 2));
// let testUpdate = `SELECT * FROM Students WHERE firstname = 'Roberto' AND lastname = 'Firmino' AND cohort_id = 2`
// dbModel.connection.each(testUpdate,(err,row)=>{
//   if(typeof row == 'object'){
//     console.log(`Test create student : success`);
//   }
// });