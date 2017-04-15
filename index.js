"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
import * as Repl from "repl"

let dbModel = new DBModel("db/student.db")

let argv = process.argv
if(argv[2] == 'playtime'){
	let repl = Repl.start(' > ')
		repl.context.dbModel = dbModel
		repl.context.Student = Student
		repl.context.Cohort = Cohort
}else{
	console.log('You must run with >> $ babel-node index.js playtime ')
}

 // Student.create(dbModel.connection,new Student("windiana","krismanuyar",1))
 // Student.update(dbModel.connection,new Student("windi","krism",1, 1))
 // Student.delete(dbModel.connection, "4")
 // Student.show(dbModel.connection)
 // Student.findById(dbModel.connection, "3" )
 /*
  Student.findAll(dbModel.connection,
  function(data,err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("error");
    }
  })
  */
  /*
  Student.where(dbModel.connection, "first_name = 'edim' ",
  function(data,err) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    } else {
      console.log("error");
    }
  })
	Student.findOrCreate(dbModel.connection, new Student("windiana","krismanuyar","2"))
  */
