"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
let replServer = repl.start({
    prompt: '> '
})

replServer.context.dbModel = new DBModel("./db/student.db")
replServer.context.Student = Student
replServer.context.Cohort = Cohort
