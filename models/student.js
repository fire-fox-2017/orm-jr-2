"use strict"

class Student {
  constructor (firstname, lastname, cohort_id, id=null) {
    this._id = id;

    this._firstname = firstname;
    this._lastname = lastname;
    this._cohort_id = cohort_id
/*
    this._firstname = "Unknown";
    if (args && args.hasOwnProperty(args.['firstname']))
      this._firstname = args.['firstname']

    this._lastname = "";
    if (args && args.hasOwnProperty(args.['lastname']))
      this._lastname = args.['lastname']
*/
  }
  get id() {
    return this._id;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get cohort_id() {
    return this._cohort_id;
  }

  static create (connection, student_obj) {
    let db = connection;
    // let current_student = this;

    let query = `INSERT INTO students (firstname, lastname, cohort_id) VALUES ( '${student_obj.firstname}', '${student_obj.lastname}', ${student_obj.cohort_id})`

    return new Promise( function(resolve, reject) {

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
            reject(err);
          }
          else {
            student_obj._id = this.lastID;
            console.log(`Insert Student '${student_obj.firstname}' Successfully.`);
            resolve(student_obj);
          }
        });
      });

    })// end of Promise

  } // end of create

  static update (connection, student_obj) {
    let db = connection;

    let query = `UPDATE students SET firstname = '${student_obj.firstname}', lastname = '${student_obj.lastname}', cohort_id = ${student_obj.cohort_id} WHERE id = ${student_obj.id}`

    return new Promise( function(resolve, reject) {

      db.serialize(function () {
        db.run(query, function (err) {
          if (err) {
            console.log(err);
            reject(err);
          }
          else {
            console.log("------------------" + this.lastID);
            console.log(`Updated Student id:${student_obj.id}, ${student_obj.firstname} Successfully.`);
            resolve(student_obj);
          }
        });
      });

    })

  } // end of update

  static delete (connection, student_id) {
    let db = connection;

    let query = `DELETE FROM students WHERE id = ${student_id}`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          // current_student._id = this.lastID;
          console.log(`Deleted Student with id:${student_id}.`);
        }
      });
    });

  } // end of delete

  static findById (connection, student_id) {
    let db = connection;
    let query = `SELECT * from students where id = ${student_id}`;

    // db.all(query, function(err, rows) {
    //   rows.forEach(function(row) {
    //     console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
    //   })
    // });

    db.each(query, function(err, row) {
      console.log(row);
      let student = new Student(row.id, row.firstname, row.lastname, row.cohort_id);
      return student;
    });

  } // end of findById


  static findAll(connection, callback) {
    let db = connection;
    let query = `SELECT * from students`;

    db.all(query, function(err, rows) {
      // rows.forEach(function(row) {
      //   console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      // })

      callback(rows, err);

    });
  } // end of findAll

  static where(connection, options, callback) {
    let db = connection;
    let query = `SELECT * from students where ${options}`;

    db.all(query, function(err, rows) {
      callback(rows, err);
    });

  } // end of where






}

export default Student
