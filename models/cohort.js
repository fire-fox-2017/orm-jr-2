"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
    this.cohortName = name;
    this.id = id;
  }

  static create(db, cohort) {
    let createQuery = `INSERT INTO cohorts(name) VALUES ('${cohort.cohortName}')`;
    db.serialize(() => {
      db.run(createQuery, (err) => {
        err ? console.log(err) : console.log(`success menambah '${cohort.cohortName}'`);
      });
    });
  }

  static update(db, cohort) {
    let updateQuery = `UPDATE cohorts SET name = '${cohort.cohortName}' WHERE id = ${cohort.id}`;
    db.serialize(() => {
      db.run(updateQuery, (err) => {
        err ? console.log(err) : console.log(`berhasil update data '${cohort.cohortName}'`);
      });
    });
  }

  static delete(db, id) {
    let deleteQuery = `DELETE FROM cohorts WHERE id = ${id}`;
    db.serialize(() => {
      db.run(deleteQuery, (err) => {
        err ? console.log(err) : console.log(`berhasil di delete`);
      });
    });
  }

  static findById(db, id) {
    let findQuery = `SELECT * FROM cohorts WHERE id LIKE ${id}`;
    db.serialize(() => {
      db.each(findQuery, (err, row) => { // kalau each return satu per satu
        err ? console.log(err) : console.log(row);
      });
    });
  }

  static findAll(db, callback) {
    let findByAllQuery = `SELECT * FROM cohorts`;
    db.serialize(() => {
      db.all(findByAllQuery, (err, data) => { // kalau all return semuanya
        err ? callback(null, err) : callback(data, null);
      });
    });
  }

  static where(db, value, callback) {
    let whereQuery = `SELECT * FROM cohorts WHERE ${value}`;
    db.serialize(() => {
      db.all(whereQuery, (err, data) => {
        err ? callback(null, err) : callback(data, null);
      })
    })
  }

  static findAllOffset(db, limit, callback) {
    let query = `SELECT * FROM cohorts LIMIT ${limit.limit} OFFSET ${limit.offset}`
    db.all(query, callback)
}

  static findOrCreate(db, data){
    // console.log(typeof data.firstname);
    let query = `SELECT * FROM cohorts WHERE name = '${data.cohortName}'`;
    db.get(query,(err,file)=>{
      if(err){
        console.log(err);
      } else {
        if(file == undefined) {
          let insert_query = `INSERT INTO cohorts (name) VALUES ('${data.cohortName}')`;
          db.serialize(() => {
            db.run(insert_query, (err)=>{
              if(err){
                console.log(err.message);
              } else {
                console.log(`Data Insert Success`);
              }
            })
          })
        } else {
          console.log(`Datanya udah ada coy`);
        }
      }
    })
  }

}

export default Cohort
