"use strict"

import DBModel from "./db_model.js"

class Student {
    constructor(firstname, lastname, idCohor, id = 0) {
        this._firstname = firstname
        this._lastname = lastname
        this._idCohor = idCohor
        this._id = id
    }

    static create(db, objStudent) {
        let query1 = `INSERT INTO students (firstname, lastname, idCohor) VALUES ('${objStudent._firstname}', '${objStudent._lastname}', ${objStudent._idCohor})`;
        db.serialize(() => {
            db.run(query1, (err) => {
                if (err) {
                    console.log(`Insert to table student error`);
                    // reject(err)
                } else {
                    console.log(`Insert to table student successfull`);
                }
            })
        })
    }

    static update(db, objStudent) {
        db.serialize(() => {
            let query2 = `UPDATE students SET firstname = '${objStudent._firstname}', lastname = '${objStudent._lastname}', idCohor = '${objStudent._idCohor}' WHERE id = '${objStudent._id}'`;
            db.run(query2, (err) => {
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
            let query3 = `DELETE FROM students WHERE id = ${idStudent}`
            db.run(query3, (err) => {
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
            let query4 = `SELECT * FROM students WHERE id = ${idStudent}`
            db.each(query4, (err, row) => {
                if (err) {
                    console.log(`Get data student with id: ${idStudent} error`);
                } else {
                    console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.idCohor}`);
                }
            })
        })
    }

    // static findAll(db, callback) {
    //     db.serialize(() => {
    //         let query5 = `SELECT * FROM students`
    //         db.all(query5, (err, rows) => {
    //             callback(rows, err)
    //         })
    //     })
    // }

    static findAll(db,string,callback){
      db.serialize(() => {
        let query5 = `SELECT * FROM students LIMIT ${string.limit} OFFSET ${string.offset}`;
        db.all(query5, (err,rows) => {
          callback(rows, err);
        })
      })
    }

    static where(db, string, callback) {
        let str = string.split('=');
        // console.log(str[1]);
        db.serialize(() => {
            let query6 = `SELECT * FROM students WHERE ${str[0]} = ${str[1]}`;
            db.all(query6, (err, rows) => {
                callback(rows, err)
            })
        })
    }

    static findOrCreate(db, objStudent){
      let query7 = `SELECT * FROM students WHERE firstname = '${objStudent._firstname}' AND lastname = '${objStudent._lastname}' AND idCohor = '${objStudent._idCohor}'`;
      let query8 = `INSERT INTO students (firstname, lastname, idCohor) VALUES ('${objStudent._firstname}', '${objStudent._lastname}', ${objStudent._idCohor})`;

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

export default Student
