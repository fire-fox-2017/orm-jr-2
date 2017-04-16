"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

class Cohort {
  constructor(nameCohort, findId){
      this._name = nameCohort;
      this._findId = findId;
  }

  static create(db, objkCohort){
    console.log(objkCohort)
      let INSERT_COHORT = `INSERT INTO cohort(name) VALUES('${objkCohort._name}')`
      db.serialize(function(){
        db.run(INSERT_COHORT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("SUKSES INPUT DATA");
          }
        });
      });
  }

  static update(db, objkCohort){
      let UPDATE_COHORT = `UPDATE cohort SET name='${objkCohort._name}' WHERE id=${objkCohort._findId}`
        db.run(UPDATE_COHORT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("SUKSES UPDATE COHORT");
          }
        });
  }

  static delete(db, deleteById){
      let DELETE_COHORT = `DELETE from cohort WHERE id=${deleteById}`
        db.run(DELETE_COHORT, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("SUKSES DELETE COHORT");
          }
        });
  }


  static findById(db, findById){
      let FIND_COHORT = `SELECT * FROM cohort WHERE id=${findById}`

        db.each(FIND_COHORT, function(err, data){
          if(err){
            console.log(err.message);
          }
          else{
            console.log(`Name : ${data.name}`);
          }
        });
  }

  static findAll(db, objk, callback){
    let FIND_ALL_COHORT = `SELECT * FROM cohort LIMIT ${objk.limit} OFFSET ${objk.offset}`
    db.all(FIND_ALL_COHORT, function(err, data){
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
    let SELECT_ALL_COHORT = `SELECT * FROM student`
    let ketemu = [];

    db.all(SELECT_ALL_COHORT, function(err, data){
      if(err){
        console.log("ERROR")
      }
      else{
        for(let i=0;i<data.length;i++){
          if(data[i].name == objk._name)
          ketemu.push(data[i])
        }
      }

      if(ketemu.length>0){
        console.log(`${ketemu[0].id} ${ketemu[0].name}`);
      }

      else{
        Cohort.create(db, objk);
      }
    });
  }

  static where(db, query, callback){
    let FIND_CONDITION = `SELECT * FROM cohort WHERE ${query}`
    db.all(FIND_CONDITION, function(err, data){
      if(err){
        callback(null, err)
      }
      else{
        callback(data, null)
      }
    });
  }
}

export default Cohort
