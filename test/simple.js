import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("./db/test.db")

console.log(`Inserting new student..`);
let studentObj = {first_name: "TB", last_name: "Simatupang", cohort_id: 1};
Student.create(db.connection, studentObj);
db.serialize(() => {
  db.get(`SELECT * FROM students WHERE first_name = "${studentObj.first_name}"`, (err, row) => {
    if(err) {
      console.log(err);
    } else {
      if (row.last_name === studentObj.last_name && row.cohort_id === studentObj.cohort_id) {
        console.log(`test create student: success`);
      } else {
        console.log(`test create student: fail`);
      }
    }
  });
});

console.log(`Updating the student..`);
let lastId = Student.getLastId(db.connection);
let studentObj = {first_name: "Gatot", last_name: "Subroto", cohort_id: 2, id: lastId};
Student.update(db.connection, studentObj);
db.serialize(() => {
  db.get(`SELECT * FROM students WHERE id = "${lastId}"`, (err, row) => {
    if(err) {
      console.log(err);
    } else {
      if (row.last_name === studentObj.last_name && row.cohort_id === studentObj.cohort_id) {
        console.log(`test update student: success`);
      } else {
        console.log(`test update student: fail`);
      }
    }
  });
});
