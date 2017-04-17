"use strict"

class DBModel {
  constructor(){
    const sqlite = require('sqlite3').verbose();
    this.connection = new sqlite.Database('./db/students.db'); ;
  }

  setup(){
    const sqlite = require('sqlite3').verbose();
    let db = this.connection;
    this.studentSetup(db);
    this.cohortSetup(db);
    this.seedStudent(db);
    this.seedCohort(db);
  }

  studentSetup(db)
  {
    var query = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100),cohort_id INTEGER, FOREIGN KEY (cohort_id) references cohort(id));";
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('TABLE STUDENT BERHASIL DIBUAT');
        }
      });
    });
  }

  cohortSetup(db){
    var query = "CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL);";
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('TABLE COHORT BERHASIL DIBUAT');
        }
      });
    });
  }

  seedStudent(db){
    var query = "INSERT INTO student (firstname,lastname,cohort_id) VALUES ('Rubi','Henjaya',1),('Riza','Fahmi',1);";
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('SEED TABLE STUDENT');
        }
      });
    });
  }

  seedCohort(db){
    var query = "INSERT INTO cohort (name) VALUES ('Firefox');";
    db.serialize(function(){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }else{
          console.log('SEED TABLE COHORT');
        }
      });
    });
  }

}

export default DBModel
