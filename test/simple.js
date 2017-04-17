import DBModel from "../models/db_model.js";
import Student from "../models/student.js";
import Cohort from "../models/cohort.js";

var db = new DBModel("./db/test.db")

console.log("Creating Table Students and Cohorts")
db.setup();

console.log("Create Cohort entry")
Cohort.create(db.connection, new Cohort("Super"))
  .then( function(result) {
    // console.log("----",result);
    if(result.name == "Super")
      console.log(`===> Created Cohort '${result.name}' : success`);
    else
      console.log(`**** FAIL creating Cohort!`)
  })
  .then( function(err) {
    console.log(err);
  })


console.log("Inserting new student...");
Student.create(db.connection, new Student("Alan", "Branch", 1))
  .then( function(result) {
    // console.log("----",result);
    if(result.firstname == "Alan" && result.lastname == "Branch")
      console.log(`===> Created Student '${result.firstname} ${result.lastname}' : success`);
    else
      console.log(`**** FAIL creating Student!`)
  })
  .then( function(err) {
    console.log(err);
  })

console.log("Updating student...");
Student.update(db.connection, new Student("Alan", "Grey", 1, 1))
  .then( function(result) {
    // console.log("----",result);
    if(result.firstname == "Alan" && result.lastname == "Branch")
      console.log(`===> Created Student '${result.firstname} ${result.lastname}' : success`);
    else
      console.log(`**** FAIL updating Student!`)
  })
  .then( function(err) {
    console.log(err);
  })
