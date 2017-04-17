"use strict"
const sqlite = require('sqlite3').verbose();

class Student {
    constructor(firstName, lastName, idcohort, idStudent = 0) {
        this.first_name = firstName
        this.last_name = lastName
        this.id_cohort = idcohort
        this.id_student = idStudent
    }

    static create(db, obj) {
        console.log(db);
        var db = new sqlite.Database(db.filename);
        var SEED_DATA = `INSERT INTO students (firstname, lastname, id_cohort) VALUES ('${obj.first_name}', '${obj.last_name}' ,${obj.id_cohort});`;
        console.log(SEED_DATA)
        db.serialize(function() {
            db.run(SEED_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('INSERT SUCCESS');
                }
            });
        });

    }
    static update(db, obj) {

        var db = new sqlite.Database(db.filename);
        var UPDATE_DATA = `UPDATE students SET firstname = '${obj.first_name}',lastname = '${obj.last_name}', id_cohort = ${obj.id_cohort} WHERE id=${obj.id_student};`;
        console.log(UPDATE_DATA)
        db.serialize(function() {
            db.run(UPDATE_DATA, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('UPDATE SUCCESS');
                }
            });
        });

    }
    static delete(db, id) {

        var db = new sqlite.Database(db.filename);
        let DELETE_QUERY = `DELETE FROM students WHERE id=${id}`;
        console.log(DELETE_QUERY)
        db.serialize(function() {
            db.run(DELETE_QUERY, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('DELETE SUCCESS');
                }
            });
        });
    }

    static findById(db, id) {
        var db = new sqlite.Database(db.filename);
        let SELECT_QUERY = `SELECT * FROM students WHERE id = '${id}'`;
        console.log(SELECT_QUERY)
        db.serialize(function() {
            db.each(SELECT_QUERY, function(err, row) {
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(row))
            });
        });
    }

    static findAll(db,obj, callback) {
        let SELECT_QUERY = `SELECT * FROM students limit ${obj.limit} offset ${obj.offset}`;
        console.log(SELECT_QUERY)
        var db = new sqlite.Database(db.filename);
        db.serialize(function() {
            db.all(SELECT_QUERY, callback)
        })
    }

    static where(db,query, callback) {
        let SELECT_QUERY = `SELECT * FROM students WHERE ${query}`;
        console.log(SELECT_QUERY)
        var db = new sqlite.Database(db.filename);
        db.serialize(function() {
            db.all(SELECT_QUERY, callback)
        })
    }


    static findOrCreate(db, obj) {
        var db = new sqlite.Database(db.filename);
        let SELECT_QUERY = `SELECT * FROM students WHERE firstname = '${obj.first_name}'`;
        console.log(SELECT_QUERY)
        db.serialize(function() {
            db.all(SELECT_QUERY, function(err, row) {
                if (err) {
                    console.log(err);
                }else{
                  if(row.length==0){
                    console.log('masuk');
                    Student.create(db,obj);
                  }
                }
            });
        });
    }
}

export default Student
