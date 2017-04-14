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
            let INSERT_DATA_COHORTS = `INSERT INTO cohorts (name) VALUES ('${objCohort._name}')`
            db.run(INSERT_DATA_COHORTS, (err) => {
                console.log('Test');
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
            let UPDATE_DATA_COHORTS = `UPDATE cohorts SET name = '${objCohort._name}' WHERE id = '${objCohort._id}'`
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

export default Cohort