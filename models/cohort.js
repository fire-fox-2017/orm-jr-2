"use strict"

const sqlite = require('sqlite3').verbose();
//import Student from "./student.js";

class Cohort {
  constructor (name, id = null) {
    this.name = name;
    this.id = id;
  }

  static create (db, obj) {
    db = new sqlite.Database(db.filename);
    db.serialize(function () {
      db.run(`INSERT INTO cohorts (name) VALUES('${obj.name}');`, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Insert cohort sucess`);
        }
      });
    });
  }

  static update (db, obj) {
    db = new sqlite.Database(db.filename);
    db.serialize(function () {
      db.run(`UPDATE cohorts SET name = '${obj.name}' WHERE id = ${obj.id};`, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Update cohort sucess`);
        }
      });
    });
  }

  static delete (db, id) {
    db = new sqlite.Database(db.filename);
    db.serialize(function () {
      db.run(`DELETE FROM cohorts WHERE id = '${id}';`, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Delete cohort sucess`);
        }
      });
    });
  }

  static findById (db, id) {
    db = new sqlite.Database(db.filename);
    db.serialize(function () {
      db.each(`SELECT * FROM cohorts WHERE id = '${id}';`, function (err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(row));
        }
      });
    });
  }

  static findAll (db, callback) {
    db = new sqlite.Database(db.filename);
    db.serialize(function () {
      db.all(`SELECT * FROM cohorts;`, function (err, rows) {
        callback(rows, err);
      });
    });
  }

  static findAll2(db, option, callback) {
      db.serialize(() => {
          db.all(`SELECT * FROM student LIMIT ${option.limit} OFFSET ${option.offset}`, (err, rows) => {
              callback(rows, err);
          })
      })
  }

  static where (db, str, callback) {
    let property = str.split(" = ")[0];
    let value = str.split(" = ")[1];
    db = new sqlite.Database(db.filename);
    db.serialize(function () {
      db.all(`SELECT * FROM cohorts WHERE ${property} = ${value};`, function (err, rows) {
        callback(rows, err);
      });
    });
  }

  static findOrCreate(db, obj) {
      db.serialize(() => {
          db.all(`SELECT * FROM student WHERE firstname = '${obj.firstname}' AND lastname = '${obj.lastname}' AND cohort_id = '${obj.cohort_id}'`, (err, rows) => {
              if (err) {
                  console.log(`ERR Find: ${err}`);
              } else {
                  if (rows.length > 0) {
                      console.log(` Data ditemukan : ${rows[0].id} | ${rows[0].firstname} | ${rows[0].lastname} | ${rows[0].cohort_id} `);
                  } else {
                      db.run(`INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${obj.firstname}', '${obj.lastname}', ${obj.cohort_id})`, (errs) => {
                          if (err) {
                              console.log(`ERR Input: ${errs}`);
                          } else {
                              console.log(`Insert student success.`);
                          }
                      })
                  }
              }
          })
      })
  }

}

export default Cohort
