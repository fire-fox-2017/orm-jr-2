"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

function help() {
  console.log(
`
Commands:
-------------
  Student(firstname, lastname, cohort_id, id)
  Cohort(name, id)

*** Student/Cohort ***
create (connection, obj)
update (connection, obj)
delete (connection, id)
findById (connection, id)
findAll(connection, callback_function)
where(connection, options, callback_function)

for example:
Student.create(dbModel.connection, new Student("firstname", "lastname", cohort_id ))


`
  )
}


let dbModel = new DBModel('./db/student.db');

const repl = require('repl');
const replServer = repl.start({prompt: '> '});
replServer.context.dbModel = dbModel;
replServer.context.Student = Student;
replServer.context.Cohort = Cohort;
replServer.context.help = help;







//
