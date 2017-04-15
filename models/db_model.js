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
            let table_students = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname varchar(255) NOT NULL UNIQUE, lastname varchar(255) NOT NULL, idCohor INTEGER NOT NULL);`
            let table_cohorts = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255) NOT NULL UNIQUE);`

            db.run(table_students, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Tabel students berhasil dibuat`);
                }
            })

            db.run(table_cohorts, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Tabel cohorts berhasil dibuat`);
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
