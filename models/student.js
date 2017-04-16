"use strict"
 const sqlite = require("sqlite3").verbose();
 const db = new sqlite.Database(`./db/student.db`);
// const db = new sqlite.Database(`./db/student.db`);
// //const replServer = require("repl");

class Student {
    constructor(firstname,lastname,id_student,cohort_id){
      this.firstname = firstname
      this.lastname = lastname
      this.id_student = id_student
      this.connection = db;
      this.cohort_id = cohort_id
    }

    static create(connection, obj){
      //console.log(connection);
      const replServer = require("repl");
      let createData = `INSERT INTO student (firstname,lastname,cohort_id) VALUES ("${obj.firstname}", "${obj.lastname}","${obj.id}")`;
      db.serialize( function(){
        db.run(createData, function(err){
          if(err){
            console.log(err)
          }
          else {
            console.log("Create new student Success!")
          }
        })
      })
    }

static addStudent(firstname,lastname){
  let add = `INSERT INTO student (firstname,lastname) VALUES (${firstname},${lastname})`
  db.serialize(function (){
    db.run(add, function(err){
      if(err){
        console.log(err)
      }
      else {
        console.log("Add Success!")
      }
    })
  })
}

  static update(connection,obj){
    let update = `UPDATE student SET firstname = "${obj.firstname}", lastname = "${obj.lastname}", cohort_id = "${obj.cohort_id}" WHERE id_student = "${obj.id_student}"`
    db.serialize(function (){
        db.run(update, function(err){
          if(err){
            console.log(err)
          }
          else{
            console.log("Update Success!")
          }
        })
    })
  }

  static delete(connection,obj){
    let del = `DELETE FROM student WHERE id_student = "${obj.id_student}"`
    db.serialize(function(){
      db.run(del,function(err){
        if(err){
          console.log(err)
        }
        else {
          console.log("Delete Success!")
        }
      })
    })
  }


    static findById(connection,obj){
      let find  = `SELECT * FROM student WHERE id_student = "${obj}"`
      db.serialize(function(){
        db.all(find,function(err,obj){
            if(err){
              console.log(err)
            }
            else{
               console.log(obj)
              // console.log("delete")
              //console.log(`${obj.id_student}" | "${obj.firstname}" | "${obj.lastname}"`)
            }
        })
      })
    }

    static findAll(connection,callback){
    let findall = `SELECT * FROM student`
    db.all(findall, callback)
  }

    static where(connection,obj,callback) {
      let wheres = `SELECT * FROM student WHERE ${obj}`
      db.all(wheres,callback)
    }

    static findAll(connection,obj,callback){
      let all = `SELECT * FROM student limit ${obj.limit} offset ${obj.offset}`
      db.all(all,callback)
    }

    static findOrCreate(connection,obj){
      let fc = `SELECT * FROM  student firstname = ${obj.firstname}, AND lastname = ${obj.lastname} AND cohort_id = ${db.get`
      db.all(all,callback)
    }

    help(){
      console.log("HELP COMMAND LIST \n -----------------------")
      console.log("add(new_firstname,new_lastname,id)")
      console.log("update(id)")
      console.log("delete(id)")
      console.log("listStudent()")
      console.log("help()")
    }
}
//     where(connection, )
// }

export default Student
