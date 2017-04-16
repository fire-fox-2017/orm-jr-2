"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
// let file = ''./db/student.db';';
// var db = new sqlite.Database(file)

class Student {
  constructor(firstname, lastname, cohortId, findId){
    this._firstName = firstname;
    this._lastName = lastname;
    this._cohortId = cohortId;
    this._findId = findId;    // UNTUK UPDATE
  }

  static create(db, objkStudent){
      let INSERT_STUDENT = `INSERT INTO student(firstname, lastname, id_cohort) VALUES('${objkStudent._firstName}', '${objkStudent._lastName}', ${objkStudent._cohortId})`
      db.serialize(function(){
        db.run(INSERT_STUDENT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("SUKSES INPUT DATA");
          }
        });
      });
  }

  static update(db, objkStudent){
      let UPDATE_STUDENT = `UPDATE student SET firstname='${objkStudent._firstName}', lastname='${objkStudent._lastName}', id_cohort=${objkStudent._cohortId} WHERE id=${objkStudent._findId}`
        db.run(UPDATE_STUDENT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("SUKSES UPDATE STUDENT");
          }
        });
  }

  static delete(db, deleteById){
      let DELETE_STUDENT = `DELETE from student WHERE id=${deleteById}`
        db.run(DELETE_STUDENT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("SUKSES DELETE STUDENT");
          }
        });
  }

  static findById(db, findById){
      let FIND_STUDENT = `SELECT * FROM student WHERE id=${findById}`

        db.each(FIND_STUDENT, function(err, data){
          if(err){
            console.log(err.message);
          }
          else{
            console.log(`Name : ${data.firstname}, Last Name : ${data.lastname}`);
          }
        });
  }

  static findAll(db, objk, callback){
    let FIND_ALL_STUDENT = `SELECT * FROM student LIMIT ${objk.limit} OFFSET ${objk.offset}`
    db.all(FIND_ALL_STUDENT, function(err, data){
      if(err){
        // data, err
        callback(null, err)
      }
      else{
        callback(data, null)
      }
    });
  }

  static findOrCreate(db, objk){
    let SELECT_ALL_STUDENT = `SELECT * FROM student`
    let ketemu = [];

    db.all(SELECT_ALL_STUDENT, function(err, data){
      if(err){
        console.log("ERROR")
      }
      else{
        for(let i=0;i<data.length;i++){
          if(data[i].firstname == objk._firstName && data[i].lastname == objk._lastName)
          ketemu.push(data[i])
        }
      }

      if(ketemu.length>0){
        console.log(`${ketemu[0].id} ${ketemu[0].firstname} ${ketemu[0].lastname} ${ketemu[0].id_cohort}`);
      }

      else{
        Student.create(db, objk);
      }
    });
  }

  static where(db, query, callback){
    let FIND_CONDITION = `SELECT * FROM student WHERE ${query}`
    db.all(FIND_CONDITION, function(err, data){

        // callback(data, err)
      if(err){
        callback(null, err)
      }
      else{
        callback(data, null)
      }
    });
  }
}

export default Student
