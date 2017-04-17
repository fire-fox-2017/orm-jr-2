"use strict"

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

export default DBModel
