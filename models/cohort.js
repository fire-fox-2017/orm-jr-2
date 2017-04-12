"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
    this.name=name;
    this.id=id;
  }
  static create(db, obj) {
    db.serialize(function() {
     db.run(`INSERT INTO cohorts (name) VALUES ('${name}');`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('COHORT ADDED');
       }
     });
   });
  }
  static update(db, obj) {
    db.serialize(function() {
      db.run(`UPDATE cohorts SET name = '${obj.name}' WHERE id = ${obj.id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('COHORT UPDATED');
        }
      });
    });
  }
  static delete(db, id) {
    db.serialize(function() {
      db.run(`DELETE FROM cohorts WHERE id = ${id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('COHORT DELETED');
        }
      });
    });
  }
  static findById(db, id) {
    db.each(`SELECT * FROM student WHERE id = '${id}';`, function(err,data) {
       if (err) {
         console.log(err.message);
       } else {
         console.log(data);
       }
    });
  }
  static findAll(db, callback) {
    db.all('SELECT * FROM cohorts', callback)
  }
  static where(db, condition, callback) {
    db.all(`SELECT * FROM cohorts WHERE ${condition}`, callback)
  }

}

export default Cohort
