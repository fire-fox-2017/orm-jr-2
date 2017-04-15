"use strict"

import Student from "./student.js";
import DBModel from "./db_model.js"

class Cohort {
    constructor(name, id = 0) {
        this._name = name
        this._id = id
    }

    static create(db, objCohort) {
        db.serialize(() => {
            let query1 = `INSERT INTO cohorts (name) VALUES ('${objCohort._name}')`
            db.run(query1, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Data cohort berhasil ditambah`);
                }
            })
        })
    }

    static update(db, objCohort) {
        db.serialize(() => {
            let query2 = `UPDATE cohorts SET name = '${objCohort._name}' WHERE id = '${objCohort._id}'`
            db.run(query2, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Data cohort berhasil diedit`);
                }
            })
        })
    }

    static delete(db, idCohort) {
        db.serialize(() => {
            let query3 = `DELETE FROM cohorts WHERE id = ${idCohort}`
            db.run(query3, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`ata cohort berhasil dihapus`);
                }
            })
        })
    }

    static findById(db, idCohort) {
        db.serialize(() => {
            let query4 = `SELECT * FROM cohorts WHERE id = ${idCohort}`
            db.each(query4, (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${row.id}|${row.name}`);
                }
            })
        })
    }

    // static findAll(db, callback) {
    //     db.serialize(() => {
    //         let query5= `SELECT * FROM cohorts`
    //         db.all(query5, (err, rows) => {
    //             callback(rows, err)
    //         })
    //     })
    // }

    static findAll(db,string,callback) {
        db.serialize(() => {
            let query5= `SELECT * FROM cohorts LIMIT ${string.limit} OFFSET ${string.offset}`;
            db.all(query5, (err, rows) => {
                callback(rows, err)
            })
        })
    }

    static where(db, string, callback) {
        let str = string.split('=')
        db.serialize(() => {
            let query6 = `SELECT * FROM cohorts WHERE ${str[0]} = ${str[1]}}`;
            db.all(query6, (err, rows) => {
                callback(rows, err)
            })
        })
    }

    static findOrCreate(db, objCohort){
      let query7 = `SELECT * FROM cohorts WHERE name = '${objCohort._name}'`;
      let query8 = `INSERT INTO cohorts (name) VALUES ('${objCohort._name}')`;

      db.serialize(() => {
        db.all(query7, (err,rows) => {
          if(rows.length > 0){
            console.log('Data Sudah Ada');
          } else {
            db.run(query8, (err) => {
              if (err) {
                  console.log(`Insert data error`);
              } else {
                  console.log(`Data berhasil masuk`);
              }
            })
          }
        })
      })
    }

}

export default Cohort
