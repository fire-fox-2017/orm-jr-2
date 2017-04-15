import DBModel from "../models/db_model.js";
import Student from "../models/student.js";
import Cohort from "../models/cohort.js";

let db = new DBModel("../db/test.db")


// Test for student db

Student.create(db.connection, new Student("Adi", "R", 2));
db.connection.serialize(() => {
    let query1= `SELECT * FROM students WHERE firstname = "Adi" AND lastname = "R" AND idCohor = "2"`
    db.connection.each(query1, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Data ditemukan: ${row.id}|${row.firstname}|${row.lastname}|${row.idCohor}`);
        }
    })
})

// console.log(db);
