"use strict"

class Student {
  constructor(firstname, lastname, cohortId, id) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohortId = cohortId;
    
  }

  static add(db, student) {
    let addQuery = `INSERT INTO students(firstname, lastname, cohort_id) VALUES('${student.firstname}', '${student.lastname}', ${student.cohortId})`;
    db.serialize(() => {
      db.run(addQuery, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log('data berhasil ditambah');
        }
      });
    });
  }

  static update(db, student) {
    let updateQuery = `UPDATE students SET firstname = '${student.firstname}', lastname = '${student.lastname}', cohort_id = ${student.cohortId} WHERE id = ${student.id}`;
    db.serialize(() => {
      db.run(updateQuery, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log('data berhasil diubah');
        }
      });
    });
  }

  static delete(db, id) {
    let deleteQuery = `DELETE from students WHERE id = '${id}'`;
    db.serialize(() => {
      db.run(deleteQuery, (err) => {
        err ? console.log(err) : console.log(`deleted!`);
      })
    });
  }

  static findById(db, id) {
    let findByIdQuery = `SElECT * FROM students WHERE id LIKE ${id}`;
    db.serialize(() => {
      db.each(findByIdQuery, (err, row) => { // kalau each return satu per satu
        err ? console.log(err) : console.log(row);
      });
    });
  }

  static findAll(db, callback) {
    let findByAllQuery = `SELECT * FROM students`;
    db.serialize(() => {
      db.all(findByAllQuery, (err, data) => { // kalau all return semuanya
        err ? callback(null, err) : callback(data, null);
      });
    });
  }

  static where(db, value, callback) {
    let whereQuery = `SELECT * FROM students WHERE ${value}`;
    db.serialize(() => {
      db.all(whereQuery, (err, data) => {
        err ? callback(null, err) : callback(data, null);
      })
    })
  }

}

export default Student