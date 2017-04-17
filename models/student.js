"use strict"

import DBModel from "./db_model.js"

class Student {
    constructor(firstname, lastname, idCohor, id = 0) {
        this._firstname = firstname
        this._lastname = lastname
        this._idCohor = idCohor
        this._id = id
    }

    static create(db, objStudent) {
        let INSERT_DATA_STUDENT = `INSERT INTO students (firstname, lastname, idCohor) VALUES ('${objStudent._firstname}', '${objStudent._lastname}', ${objStudent._idCohor})`
        db.serialize(() => {
            db.run(INSERT_DATA_STUDENT, (err) => {
                if (err) {
                    console.log(err.message);
                    reject(err)
                } else {
                    console.log(`Insert student success`);
                }
            })
        })
    }

    static update(db, objStudent) {
        db.serialize(() => {
            let UPDATE_DATA_STUDENT = `UPDATE students SET firstname = '${objStudent._firstname}', lastname = '${objStudent._lastname}', idCohor = '${objStudent._idCohor}' WHERE id = '${objStudent._id}'`
            db.run(UPDATE_DATA_STUDENT, (err) => {
                if (err) {
                    console.log(`Update data error`);
                } else {
                    console.log(`Update data: ${objStudent._id}|${objStudent._firstname}|${objStudent._lastname}|${objStudent._idCohor}`);
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
                    console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.idCohor}`);
                }
            })
        })
    }

    static where(db, colValue, callback) {
        let splitWhere = colValue.split('=')
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
            let SELECT_DATA_BY_PARAMETER = `SELECT * FROM students WHERE firstname = '${objStudent._firstname}' AND lastname = '${objStudent._lastname}' AND idCohor = '${objStudent._idCohor}'`
            db.all(SELECT_DATA_BY_PARAMETER, (err, rows) => {
                if (rows.length) {
                    console.log(`Data has exist in table student`);
                } else {
                    let INSERT_DATA_STUDENT = `INSERT INTO students (firstname, lastname, idCohor) VALUES ('${objStudent._firstname}', '${objStudent._lastname}', ${objStudent._idCohor})`
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
