"use strict"

import DBModel from "./db_model.js"

class Student {
    constructor(firstname, lastname, idCohort, id=0) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._idCohort = idCohort;
        this._id = id;
    }

    static create(db, objStudent) {
        db.serialize(() => {
            db.run(`INSERT INTO students (first_name, last_name, id_cohort) VALUES ('${objStudent._firstname}', '${objStudent._lastname}', ${objStudent._idCohort})`, (err) => {
                if (err) {
                    console.log(`Insert to table student error`);
                } else {
                    console.log(`Insert to table student successfull`);
                }
            })
        })
    }

    static update(db, objStudent) {
        db.serialize(() => {
            let UPDATE_DATA_STUDENT = `UPDATE students SET first_name = '${objStudent._firstname}', last_name = '${objStudent._lastname}', id_cohort = '${objStudent._idCohort}' WHERE id = '${objStudent._id}'`
            db.run(UPDATE_DATA_STUDENT, (err) => {
                if (err) {
                    console.log(`Update data error`);
                } else {
                    console.log(`Update data: ${objStudent._id}|${objStudent._firstname}|${objStudent._lastname}|${objStudent._idCohort}`);
                }
            })
        })
    }

    static delete(db, idStudent) {
        db.serialize(() => {
            let DELETE_DATA_STUDENT = `DELETE FROM students WHERE id = ${idStudent}`
            db.run(DELETE_DATA_STUDENT, (err) => {
                if (err) {
                    console.log(`Delete data student with id: ${idStudent} error`);
                } else {
                    console.log(`Delete data student with id: ${idStudent} successfull`);
                }
            })
        })
    }

    static findById(db, idStudent) {
        db.serialize(() => {
            let GET_STUDENT_BY_ID = `SELECT * FROM students WHERE id = ${idStudent}`
            db.each(GET_STUDENT_BY_ID, (err, row) => {
                if (err) {
                    console.log(`Get data student with id: ${idStudent} error`);
                } else {
                    console.log(`${row.id}|${row.first_name}|${row.last_name}|${row.id_cohort}`);
                }
            })
        })
    }

    static where(db, colValue, callback) {
        db.serialize(() => {
            let GET_DATA_WHERE = `SELECT * FROM students WHERE ${colValue}`
            db.all(GET_DATA_WHERE, (err, rows) => {
                callback(rows, err)
            })
        })
    }

    static findAll(db, obj, callback) {
        db.serialize(() => {
          let GET_ALL_DATA = `SELECT * FROM students LIMIT ${obj.limit} OFFSET ${obj.offset}`
          db.all(GET_ALL_DATA, (err, rows) => {
            if (err) {
                callback(err, rows)
            } else {
                callback(rows, err)
            }
        })
    })
  }

    static findOrCreate(db, objStudent) {
        db.serialize(() => {
            let SELECT_DATA_BY_PARAMETER = `SELECT * FROM students WHERE first_name = '${objStudent._firstname}' AND last_name = '${objStudent._lastname}'`
            db.all(SELECT_DATA_BY_PARAMETER, (err, rows) => {
                if (rows.length) {
                    console.log(`Data has exist in student table`);
                } else {
                    let INSERT_DATA_STUDENT = `INSERT INTO students (first_name, last_name, id_cohort) VALUES ('${objStudent._firstname}', '${objStudent._lastname}', ${objStudent._idCohort})`
                    db.run(INSERT_DATA_STUDENT, (err) => {
                        if (err) {
                            console.log(`Insert to table student error`);
                        } else {
                            console.log(`Insert to table student successfull`);
                        }
                    })
                }
            })
        })
    }
}

export default Student
