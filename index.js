"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');

let replServer = repl.start({prompt: '> '});

let help = () => {
  console.log("--COMMAND LIST--");
  console.log("dbModel                                                                                                                         to create new model and test the connection");
  console.log("dbModel.setup()                                                                                                                 to create students table and cohorts table in database");
  console.log("Student.findOrCreate(dbModel.connection, {first_name:<first_name>, last_name:<last_name>, cohort_id:<cohort_id>}))              to find or create student if not found");
  console.log("Student.create(dbModel.connection, new Student(<first_name>, <last_name>, <cohort_id>))                                         to insert new student to students table");
  console.log("Student.update(dbModel.connection, new Student(<first_name>, <last_name>, <cohort_id>, <student_id>))                           to update student data in students table");
  console.log("Student.delete(dbModel.connection, <student_id>)                                                                                to delete student from students table");
  console.log("Cohort.create(dbModel.connection, new Cohort(<group_name>)                                                                      to insert new cohort to cohorts table");
  console.log("Cohort.update(dbModel.connection, new Cohort(<group_name>, <cohort_id>)                                                         to update cohort data in cohort table");
  console.log("Cohort.delete(dbModel.connection, <cohort_id>)                                                                                  to delete cohort data from cohort table");
  console.log("Cohort.findOrCreate(dbModel.connection, {name:<group_name>})                                                                    to find or create cohort if not found");

}



replServer.context.help = help;
replServer.context.dbModel = new DBModel();
replServer.context.Student = Student;
replServer.context.Cohort = Cohort;
