"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl')
let rp = repl.start('>> ')
rp.context.dbModel = new DBModel('./db/student.db')
rp.context.Student = Student;
rp.context.Cohort = Cohort;