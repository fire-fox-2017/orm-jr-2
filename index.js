"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
import * as Repl from "repl"

let db = new DBModel('db/student.db');
// let db = new DBModel("db/test.db");


let argv = process.argv;
if (argv[2] === 'playtime') {
  let repl = Repl.start('Command Here>');
  repl.context.dbModel = db;
  repl.context.Student = Student;
  repl.context.Cohort  = Cohort;
}