"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
var replServer = repl.start({prompt: `> `});

function help() {
  console.log(`Help           : help()`)
  console.log(`Load DB File   : dbModel`)
  console.log(`Create Table   : dbModel.setup()`)
  console.log(`Insert Student : Student.create(dbModel.connection, new Student(firstname, lastname, cohort_id))`)
  console.log(`Update Student : Student.update(dbModel.connection, new Student(firstname, lastname, cohort_id, id))`)
  console.log(`Delete Student : Student.delete(dbModel.connection, id)`)
  console.log(`Show Student   : Student.findById(dbModel.connection, id)`)
  console.log(`Show All Student :
  Student.findAll(dbModel.connection, function (data, err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log('Error');

    }
  });`)
  console.log(`Show Student :
  Student.where(dbModel.connection, "firstname = 'firstname'", function (data, err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log('Error');
    }
  });`)
  console.log(`Insert Cohort  : Cohort.create(dbModel.connection, new Cohort(name))`)
  console.log(`Update Cohort  : Cohort.update(dbModel.connection, new Cohort(name, id))`)
  console.log(`Delete Cohort  : Cohort.delete(dbModel.connection, id)`)
  console.log(`Show Cohort    : Cohort.findById(dbModel.connection, id)`)
  console.log(`Show All Cohort:
  Student.findAll(dbModel.connection, function (data, err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log('Error');

    }
  });`)
  console.log(`Show Cohort    :
  Student.where(dbModel.connection, "firstname = 'Parel'", function (data, err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log('Error');
    }
  });`)
  console.log(`Show All with Limit and Offset :
  Student.findAll2(dbModel.connection, {limit:<limit>, offset:<offset>}, function(data, err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log('Error');
    }
  });`)
  console.log(`Find or Create   : Student.findOrCreate(dbModel.connection, new Student(firstname, lastname, cohort_id));`)
};

let args = process.argv;
if (args[2] == `playtime`) {
  replServer.context.dbModel = new DBModel('./db/student.db');
  replServer.context.Student = Student;
  replServer.context.Cohort = Cohort;
  replServer.context.help = help;
} else {
  console.log(`Usage : $ babel-node index.js playtime`);
  process.exit(1);
}
