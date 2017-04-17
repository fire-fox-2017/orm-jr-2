"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
let replServer = repl.start({
    prompt: '> '
})
let help = () => {
  console.log(`dbModel.setup() ===> create table students & cohorts\n
  Student.create()
  `);
}
replServer.context.dbModel = new DBModel("./db/student.db");
replServer.context.help = help;
replServer.context.Student = Student;
replServer.context.Cohort = Cohort;
