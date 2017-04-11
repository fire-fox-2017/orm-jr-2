"use strict"

import Student from "./student.js";

class Cohort {
  constructor (name, id=null) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  static create (connection, cohort_obj) {
    let db = connection;
    // let current_cohort = this;

    let query = `INSERT INTO cohorts (name) VALUES ( '${cohort_obj.name}')`

    return new Promise( function(resolve, reject) {

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
            reject(err);
          }
          else {
            cohort_obj._id = this.lastID;
            console.log(`Insert Cohort '${cohort_obj.name}' Successfully.`);
            resolve(cohort_obj);
          }
        });
      });

    }) // end of promise


  } // end of create

  static update (connection, cohort_obj) {
    let db = connection;

    let query = `UPDATE cohorts SET name = '${cohort_obj.name}' WHERE id = ${cohort_obj.id}`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          // current_student._id = this.lastID;
          console.log(`Updated Cohort id:${cohort_obj.id}, ${cohort_obj.name} Successfully.`);
        }
      });
    });

  } // end of update

  static delete (connection, cohort_id) {
    let db = connection;

    let query = `DELETE FROM cohorts WHERE id = ${cohort_id}`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          // current_student._id = this.lastID;
          console.log(`Deleted Cohort with id:${cohort_id}.`);
        }
      });
    });

  } // end of delete

  static findById (connection, cohort_id) {
    let db = connection;
    let query = `SELECT * from cohorts where id = ${cohort_id}`;

    // db.all(query, function(err, rows) {
    //   rows.forEach(function(row) {
    //     console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
    //   })
    // });

    db.each(query, function(err, row) {
      console.log(row);
      let cohort = new Cohort(row.id, row.name);
      return cohort;
    });

  } // end of findById

  static findAll(connection, callback) {
    let db = connection;
    let query = `SELECT * from cohorts`;

    db.all(query, function(err, rows) {
      callback(rows, err);
    });

  } // end of findAll

  static where(connection, options, callback) {
    let db = connection;
    let query = `SELECT * from cohorts where ${options}`;

    db.all(query, function(err, rows) {
      callback(rows, err);
    });

  } // end of where






}

export default Cohort
