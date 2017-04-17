"use strict"

class Student {
  constructor(firstname,lastname,id){
    this.fname=firstname;
    this.lname=lastname;
    this.id = id;
  }

  static create(connection,objStudent){
    let db = connection;
    var query = `INSERT INTO student (firstname,lastname,cohort_id) VALUES ('${objStudent.fname}','${objStudent.lname}','${objStudent.id}');`;
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`${objStudent.fname} has been created`);
        }
      });
    });
  }

  static update(connection,objStudent)
  {
    let db= connection;
    var query = `UPDATE student set firstname='${objStudent.fname}',lastname='${objStudent.lname}',cohort_id='${objStudent.id}' WHERE id='${objStudent.id}';`;
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log(`${objStudent.fname} has been updated`);
        }
      });
    });
  }

  static delete(connection,kondisi){
    let db= connection;
    var query = `DELETE FROM student WHERE id = '${kondisi}';`;
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log(` Data has been Deleted`);
        }
      });
    });
  }

  static findById (connection, id) {
    let db = connection;
    let query = `SELECT * from student where id = ${id}`;
    db.each(query, function(err, row) {
      if(err)
      console.log(err);
      else {
        console.log(row);
        let student = new Student(row.id, row.firstname, row.lastname, row.cohort_id);
        return student;
      }

    });

  }

  // static findAll(connection, callback) {
  //   let db = connection;
  //   let query = `SELECT * from student`;
  //   db.all(query, function(err, rows) {
  //     if(err){
  //       callback(err,null)
  //     }else callback(rows,null);
  //   });
  // }

  static findAll(connection,objKondisi,callback) {
    let db = connection;
    let query = `SELECT * from student limit ${objKondisi.limit} ${objKondisi.offset}`;
    db.all(query, function(err, rows) {
      if(err){
        callback(err,null)
      }else callback(rows,null);
    });
  }



  static where(connection, kondisi, callback) {
    let db = connection;
    let query = `SELECT * from student where ${kondisi}`;
    db.all(query, function(err, rows) {
      if(err)
      {
        callback(err,null);
      }else callback(rows,null);
    });

  }

  static findOrCreate(connection, objStudent) {
    let db = connection;
    var insert  = `INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${objStudent.fname}', '${objStudent.lname}', '${objStudent.id}')`;
    var select   = `SELECT * FROM student WHERE firstname = '${objStudent.fname}' AND lastname = '${objStudent.lname}'`;
    db.all(select, function(err, res) {
      console.log(res);
      if(res.length) {
        console.log(`${objStudent.fname} ${objStudent.lname} exists`);
      } else {
        db.serialize(function() {
          db.run(insert, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${objStudent.fname} ${objStudent.lname} has been created`);
            }
          });
        });
      }
    })
  }

}

export default Student
