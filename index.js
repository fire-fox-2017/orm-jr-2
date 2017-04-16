"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

function help(){
  console.log(`dbModel : see model`);
  console.log(`dbModel.setup() : create table students and cohorts`);
}

// let dbModel = new DBModel({open:true,filename:'db/student.db', mode: 65542});

let argv=process.argv;
if(argv.length>1){
  argv.shift();
  argv.shift();
  let str=argv.join();
  str=str.replace(/,/g," ");
  if(str=='playtime'){
    var replServer = repl.start({prompt: '> '});
    replServer.context.dbModel = new DBModel()
    replServer.context.help = help
    replServer.context.Student = Student
    replServer.context.Cohort = Cohort
  }

}else{
  console.log("no word detected");
}
