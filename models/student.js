"use strict"
class Student {
  constructor(first_name, last_name, cohort_id, id) {
    this.first_name = first_name
    this.last_name = last_name
    this.cohort_id = cohort_id
    this.id = id
  }
  static create(db, object) {
    var CREATE_STUDENT_QUERY =
      `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${object.first_name}', '${object.last_name}', '${object.cohort_id}')`
    db.serialize(function() {
      db.run(CREATE_STUDENT_QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("student created");
        }
      });
    });
  }
  static update(db, data) {
    var UPDATE_STUDENT_QUERY =
      `UPDATE students SET first_name = '${data.first_name}',last_name = '${data.last_name}',cohort_id = '${data.cohort_id}'  WHERE id = ${data.id}`
    console.log(UPDATE_STUDENT_QUERY);
    db.serialize(function() {
      db.run(UPDATE_STUDENT_QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("student updated");
        }
      });
    });
  }
  static delete(db, id) {
    var DELETE_STUDENT_QUERY = `DELETE FROM students WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_STUDENT_QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("student deleted");
        }
      });
    });
  }
  static show(db) {
    var SHOW_STUDENT_QUERY = `SELECT * FROM students`
    db.serialize(function() {
      db.each(SHOW_STUDENT_QUERY, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    });
  }
  static findById(db, id) {
    var FIND_ID_QUERY = `SELECT * FROM students where id = ${id}`;
    db.each(FIND_ID_QUERY, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }
  static findAll(db, callback) {
    var FIND_ALL_QUERY = "SELECT * FROM students"
    db.all(FIND_ALL_QUERY, function(err, rows) {
      callback(rows, err)
    })
  }
  static where(db, str, callback) {
    var WHERE_QUERY = `SELECT * FROM students WHERE ${str}`
    db.all(WHERE_QUERY, function(err, rows) {
      callback(rows, err)
    })
  }

  static findOrCreate(db, object) {
    var INSERT_QUERY  = `INSERT INTO students (first_name, last_name, cohort_id) VALUES ('${object.first_name}', '${object.last_name}', '${object.cohort_id}')`
    var CHECK_QUERY   = `SELECT * FROM students WHERE first_name = '${object.first_name}' AND last_name = '${object.last_name}'`

    db.all(CHECK_QUERY, function(err, data) {
      console.log(data);
      if(data.length) {
        console.log('data already exists');
      } else {
        db.serialize(function() {
          db.run(INSERT_QUERY, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Student Added");
            }
          });
        });
      }
    })
  }

// Student.findOrCreate(dbModel.connection, new Student("windiana","krismanuyar","2"))
}
export default Students
