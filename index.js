"use strict"

// import DBModel from "./models/db_model.js";
// import Cohort from "./models/cohort.js";
// import Student from "./models/student.js";

const repl = require('repl');
let replServer = repl.start({
    prompt: '> '
})

const sqlite = require('sqlite3').verbose()


class DBModel {
    constructor(database) {
        this.database = database
        this.connection = new sqlite.Database(this.database)
    }

    setup() {
        let db = this.connection
        db.serialize(() => {
            let CREATE_TABLE_STUDENTS = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname varchar(255) NOT NULL UNIQUE, lastname varchar(255) NOT NULL, idCohor INTEGER NOT NULL);`
            let CREATE_TABLE_COHORTS = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255) NOT NULL UNIQUE);`

            db.run(CREATE_TABLE_STUDENTS, (err) => {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log(`Create Table Students success`)
                }
            })

            db.run(CREATE_TABLE_COHORTS, (err) => {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log(`Create Table Cohorts success`)
                }
            })
        })
    }
}

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

class Cohort {
    constructor(name, id = 0) {
        this._name = name
        this._id = id
    }

    static create(db, objCohort) {
        db.serialize(() => {
            let INSERT_DATA_COHORTS = `INSERT INTO cohorts (name) VALUES ('${objCohort._name}')`
            db.run(INSERT_DATA_COHORTS, (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(`Insert cohorts successfull`);
                }
            })
        })
    }

    static update(db, objCohort) {
        db.serialize(() => {
            let UPDATE_DATA_COHORTS = `UPDATE cohorts SET name = '${objCohort._name}' WHERE id = '${objCohort._id}'`
            db.run(UPDATE_DATA_COHORTS, (err) => {
                if (err) {
                    console.log(`Update error`);
                } else {
                    console.log(`Update: ${objCohort._name}`);
                }
            })
        })
    }

    static delete(db, idCohort) {
        db.serialize(() => {
            let DELETE_DATA_COHORTS = `DELETE FROM cohorts WHERE id = ${idCohort}`
            db.run(DELETE_DATA_COHORTS, (err) => {
                if (err) {
                    console.log(`Delete error`);
                } else {
                    console.log(`Delete data cohort with id: ${idCohort} successfull`);
                }
            })
        })
    }

    static findById(db, idCohort) {
        db.serialize(() => {
            let GET_COHORT_BY_ID = `SELECT * FROM cohorts WHERE id = ${idCohort}`
            db.each(GET_COHORT_BY_ID, (err, row) => {
                if (err) {
                    console.log(`Get id cohort : ${idCohort} error`);
                } else {
                    console.log(`${row.id}|${row.name}`);
                }
            })
        })
    }

    static findAll(db, callback) {
        db.serialize(() => {
            let GET_ALL_DATA = `SELECT * FROM cohorts`
            db.all(GET_ALL_DATA, (err, rows) => {
                callback(rows, err)
            })
        })
    }

    static where(db, colValue, callback) {
        let splitWhere = colValue.split('=')
        db.serialize(() => {
            let GET_DATA_WHERE = `SELECT * FROM cohorts WHERE ${colValue}`
            db.all(GET_DATA_WHERE, (err, rows) => {
                callback(rows, err)
            })
        })
    }

}

replServer.context.dbModel = new DBModel("./db/student.db")
replServer.context.Student = Student
replServer.context.Cohort = Cohort
