"use strict"

class Student {
  constructor(firstname, lastname, cohort_id, id) {
    this.firstname=firstname;
    this.lastname=lastname;
    this.cohort_id=cohort_id;
    this.id=id;
  }
  static create(db, obj) {
    db.serialize(function() {
     db.run(`INSERT INTO students (firstname, lastname, cohort_id) VALUES ('${obj.firstname}', '${obj.lastname}', '${obj.cohort_id}');`, function(err) {
       if (err) {
         console.log(err.message);
       } else {
         console.log('STUDENT ADDED');
       }
     });
   });
  }
  static update(db, obj) {
    db.serialize(function() {
      db.run(`UPDATE students SET firstname = '${obj.firstname}', lastname = '${obj.lastname}', cohort_id = '${obj.cohort_id}' WHERE id = ${obj.id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('STUDENT UPDATED');
        }
      });
    });
  }
  static delete(db, id) {
    db.serialize(function() {
      db.run(`DELETE FROM students WHERE id = ${id};`, function(err) {
        if (err) {
          console.log(err.message);
        } else {
          console.log('STUDENT DELETED');
        }
      });
    });
  }
  static findById(db, id) {
    db.each(`SELECT * FROM students WHERE id = '${id}';`, function(err,data) {
       if (err) {
         console.log(err.message);
       } else {
         console.log(data);
       }
    });
  }
  static findAll(db, obj, callback) {
    db.all(`SELECT * FROM students LIMIT ${obj.limit} OFFSET ${obj.offset}`, callback)
  }
  static where(db, condition, callback) {
    db.all(`SELECT * FROM students WHERE ${condition}`, callback)
  }
  static findOrCreate(db, obj) {
    let Student=this;
    db.all(`SELECT * FROM students WHERE firstname = '${obj.firstname}' and lastname = '${obj.lastname}' and cohort_id = ${obj.cohort_id}`, function(err,rows){
      if(err){
        console.log(err.message);
      } else if (rows.length === 0) {
        Student.create(db,obj)
      } else {
        console.log(rows)
      }
    })
  }
}

export default Student