"use strict"
const sqlite = require('sqlite3').verbose();
import Student from "./student.js";

class Cohort {
  constructor(name) {
    this.name=name
  }

  static create(db, obj) {
      console.log(db);
      var db = new sqlite.Database(db.filename);
      var INSERT_DATA = `INSERT INTO cohorts (name) VALUES ('${obj.name}');`;
      console.log(INSERT_DATA)
      db.serialize(function() {
          db.run(INSERT_DATA, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('INSERT SUCCESS');
              }
          });
      });
  }
  static update(db, obj) {

      var db = new sqlite.Database(db.filename);
      var UPDATE_DATA = `UPDATE cohorts SET name = '${obj.name}'  WHERE id=${obj.id_student};`;
      console.log(UPDATE_DATA)
      db.serialize(function() {
          db.run(UPDATE_DATA, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('UPDATE SUCCESS');
              }
          });
      });
  }

  static delete(db, id) {

      var db = new sqlite.Database(db.filename);
      let DELETE_QUERY = `DELETE FROM cohorts WHERE id=${id}`;
      console.log(DELETE_QUERY)
      db.serialize(function() {
          db.run(DELETE_QUERY, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('DELETE SUCCESS');
              }
          });
      });
  }

  static findById(db, id) {
      var db = new sqlite.Database(db.filename);
      let SELECT_QUERY = `SELECT * FROM cohorts WHERE id = '${id}'`;
      console.log(SELECT_QUERY)
      db.serialize(function() {
          db.each(SELECT_QUERY, function(err, row) {
              if (err) {
                  console.log(err);
              }
              console.log(JSON.stringify(row))
          });
      });
  }

  static findAll(db,obj, callback) {
      let SELECT_QUERY = `SELECT * FROM cohorts limit ${obj.limit} offset ${obj.offset}`;
      console.log(SELECT_QUERY)
      var db = new sqlite.Database(db.filename);
      db.serialize(function() {
          db.all(SELECT_QUERY, callback)
      })
  }

  static where(db, query, callback) {
      let SELECT_QUERY = `SELECT * FROM cohorts WHERE ${query}`;
      console.log(SELECT_QUERY)
      var db = new sqlite.Database(db.filename);
      db.serialize(function() {
          db.all(SELECT_QUERY, callback)
      })
  }

  static findOrCreate(db, obj) {
      var db = new sqlite.Database(db.filename);
      let SELECT_QUERY = `SELECT * FROM cohorts WHERE name = '${obj.name}'`;
      console.log(SELECT_QUERY)
      db.serialize(function() {
          db.all(SELECT_QUERY, function(err, row) {
              if (err) {
                  console.log(err);
              }else{
                if(row.length==0){
                  console.log('masuk');
                  Cohort.create(db,obj);
                }
              }
          });
      });
  }

}

export default Cohort
