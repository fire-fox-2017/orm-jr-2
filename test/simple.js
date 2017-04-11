
import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var db = new DBModel("../db/test.db")

// let CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL UNIQUE, last_name TEXT, cohort_id, FOREIGN KEY(cohort_id) REFERENCES cohort(id));"
// let CREATE_TABLE_COHORT = "CREATE TABLE IF NOT EXISTS cohort(id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name);"
//
// db.connection.serialize(function() {
//   db.connection.run(CREATE_TABLE_STUDENT, function(err){
//     if(err){
//       console.log(err)
//     } else {
//       console.log('table student has created')
//     }
//   })
//   db.connection.run(CREATE_TABLE_COHORT, function(err){
//     if(err){
//       console.log(err)
//     } else {
//       console.log('table cohort has created')
//     }
//   })
// })


 Student.create(db.connection, new Student("ridho", "pratama", 1))
 let FIND_NAME = `SELECT * FROM student WHERE first_name = "ridho" AND last_name = "pratama" AND cohort_id = "1";`
 db.connection.serialize(function() {
   db.connection.all(FIND_NAME, function(err, data) {
     if(err) {
       console.log(err);
     } else {
      //  console.log(data);
       if(data.length > 0){
         console.log("test Create student: success");
       }else{
         console.log("test Create student: fail");
       }
     }
   })
 })

 // Student.update(db.connection, new Student("Daniel", "Hermawan", 1, 1))
 // let FIND_NAME = `SELECT * FROM student WHERE first_name = "Daniel" AND last_name = "Hermawan" AND cohort_id = "1" AND id = "1";`
 // db.connection.serialize(function() {
 //   db.connection.all(FIND_NAME, function(err, data) {
 //     if(err) {
 //       console.log(err);
 //     } else {
 //      //  console.log(data);
 //       if(data.length > 0){
 //         console.log("test Update student:",true);
 //       }else{
 //         console.log("test Update student:",false);
 //       }
 //     }
 //   })
 // })

// Student.delete(db.connection, 1)
// let FIND_ID = `SELECT * FROM student WHERE id = '1'`
// db.connection.serialize(() => {
//   db.connection.all(FIND_ID, (err, data) => {
//     if(err) {
//       console.log(err)
//     } else {
//       if(data.length){
//         console.log("test Delete : gagal")
//       } else {
//         console.log("test Delete : berhasil");
//       }
//     }
//   })
// })

Student.findById(db.connection, 2)
let FIND_ID = `SELECT * FROM student WHERE id = '2'`
db.connection.serialize(() => {
  db.connection.all(FIND_ID, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      // console.log(data[0].id);
      if(data[0].id == 2){
        console.log("test findById : success")
      } else {
        console.log("test findById : gagal");
      }
    }
  })
})

 // Student.findAll(db.connection, function(data, err) {
 //  if(!err){
 //    for(let i = 0; i < data.length; i++){
 //      console.log(data[i])
 //    }
 //  } else {
 //    console.log('Error')
 //  }
 // })

 // Student.where(db.connection,"first_name = 'ridho' ", function(data, err) {
 //   if(!err){
 //     for(let i = 0; i < data.length; i++){
 //       console.log(data[i])
 //     }
 //   }else {
 //     console.log('Error')
 //   }
 // })
