"use strict"

const sqlite = require('sqlite3').verbose();
import Student from "./cohort.js";

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

  // static findAll (db, callback) {
  //   db = new sqlite.Database(db.filename);
  //   db.serialize(function () {
  //     db.all(`SELECT * FROM cohorts;`, function (err, rows) {
  //       callback(rows, err);
  //     });
  //   });
  // }

  static findAll(db,string,callback) {
      db.serialize(() => {
          let query5= `SELECT * FROM cohorts LIMIT ${string.limit} OFFSET ${string.offset}`;
          db.all(query5, (err, rows) => {
              callback(rows, err)
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

  static findOrCreate(db, objCohort){
      let query7 = `SELECT * FROM cohorts WHERE name = '${objCohort.name}'`;
      let query8 = `INSERT INTO cohorts (name) VALUES ('${objCohort.name}')`;

      db.serialize(() => {
        db.all(query7, (err,rows) => {
          if(rows.length > 0){
            console.log('Data Sudah Ada');
          } else {
            db.run(query8, (err) => {
              if (err) {
                  console.log(`Insert data error`);
              } else {
                  console.log(`Data berhasil masuk`);
              }
            })
          }
        })
      })
    }

}

export default Cohort
