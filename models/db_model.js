"use strict"


class DBModel {
    constructor(filename) {
        const sqlite = require('sqlite3').verbose();
        this.connection = new sqlite.Database(filename);
        this.filename = filename;
    }
    setup() {
        const sqlite = require('sqlite3').verbose();
        var db = new sqlite.Database(this.filename);
        db.serialize(function() {
            db.run("CREATE TABLE cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE)", function(err) {
                if (err) {
                    console.log('Table cohort Exist');
                } else {
                    console.log('Create table cohort success.');
                }
            });
            db.run("CREATE TABLE student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL UNIQUE, lastname TEXT NOT NULL,cohort_id INTEGER,FOREIGN KEY(cohort_id) REFERENCES cohort(id))", function(err) {
                if (err) {
                    console.log('Table student Exist');
                } else {
                    console.log('Create table student success.');
                }
            });
        });
    }
}

export default DBModel
