"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');



let start = repl.start("> ")
start.context.dbModel = new DBModel()
start.context.Student = Student
start.context.Cohort = Cohort