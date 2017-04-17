"use strict"

const sqlite = require('sqlite3').verbose()
// const file = './db/student.db'
// const file = './db/test.db'


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
                    console.log(`Create Table Students error ${err}`)
                } else {
                    console.log(`Create Table Students success`)
                }
            })

            db.run(CREATE_TABLE_COHORTS, (err) => {
                if (err) {
                    console.log(`Create Table Cohorts error ${err}`)
                } else {
                    console.log(`Create Table Cohorts success`)
                }
            })
        })
    }

    help() {
        let listHelp = [
            `create_table_student nama_table (nama_colom_student)`,
            `create_table_cohort nama_table (nama_colom_cohort)`
        ]
        for (let i = 0; i < listHelp.length; i++) {
            console.log(`${listHelp[i]}`);
        }
    }
}

export default DBModel