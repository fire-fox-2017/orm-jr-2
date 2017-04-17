
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
            let INSERT_DATA_COHORTS = `INSERT INTO cohorts (cohort_name) VALUES ('${objCohort._name}')`
            db.run(INSERT_DATA_COHORTS, (err) => {
                if (err) {
                    console.log(`Insert to table cohorts error`);
                } else {
                    console.log(`Insert to table cohorts successfull`);
                }
            })
        })
    }

    static update(db, objCohort) {
        db.serialize(() => {
            let UPDATE_DATA_COHORTS = `UPDATE cohorts SET cohort_name = '${objCohort._name}' WHERE id = '${objCohort._id}'`
            db.run(UPDATE_DATA_COHORTS, (err) => {
                if (err) {
                    console.log(`Update data error`);
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
                    console.log(`Delete data cohort with id: ${idCohort} error`);
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
                    console.log(`Get data cohort with id: ${idCohort} error`);
                } else {
                    console.log(`${row.id}|${row.cohort_name}`);
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
        db.serialize(() => {
            let GET_DATA_WHERE = `SELECT * FROM cohorts WHERE ${colValue}`
            db.all(GET_DATA_WHERE, (err, rows) => {
                callback(rows, err)
            })
        })
    }

    static findAll(db, obj, callback) {
        db.serialize(() => {
            let GET_ALL_DATA = `SELECT * FROM cohorts LIMIT ${obj.limit} OFFSET ${obj.offset}`
            db.all(GET_ALL_DATA, (err, rows) => {
                if (err) {
                    callback(err, rows)
                } else {
                    callback(rows, err)
                }
            })
        })
    }

    static findOrCreate(db, objCohort) {
        db.serialize(() => {
            let SELECT_DATA_BY_PARAMETER = `SELECT * FROM cohorts WHERE cohort_name = '${objCohort._name}'`
            db.all(SELECT_DATA_BY_PARAMETER, (err, rows) => {
                if (rows.length) {
                    console.log(`Data has exist in table cohorts`);
                } else {
                    let INSERT_DATA_COHORT = `INSERT INTO cohorts (cohort_name) VALUES ('${objCohort._name}')`
                    db.run(INSERT_DATA_COHORT, (err) => {
                        if (err) {
                            console.log(`Insert to table cohorts error`);
                        } else {
                            console.log(`Insert to table cohorts successfull`);
                        }
                    })
                }
            })
        })
    }

}

export default Cohort
