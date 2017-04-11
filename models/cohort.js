"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id){
    this.name = name
    this.id = id
  }
  static create(connection, data){
    let db = connection
    let query = `INSERT INTO Cohorts (name) VALUES ('${data.name}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(err){
          console.log(err.message);
        } else {
          console.log('SUCESS');
        }
      })
    })
  }

  static update(connection, data){
    let db = connection
    let query = `UPDATE Cohorts SET name = '${data.name}' WHERE ID = ${data.id}`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(err){
          console.log(err.message);
        } else {
          console.log('SUCESS');
        }
      })
    })
  }

  static delete(connection,data){
    let db = connection
    let query = `DELETE FROM Cohorts WHERE ID = ${data}`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(err){
          console.log(err.message);
        } else {
          console.log('SUCESS');
        }
      })
    })
  }

  static findById(db,data){
    // let db = connection
    let query = `SELECT * FROM Cohorts WHERE ID = ${data}`
    db.all(query,(err, data)=>{
      if(err){
        console.log(err.message);
      } else {
        console.log(data);
      }
    })
  }

  static findAll(db,callback){
    // let db = connection
    let query = `SELECT * FROM Cohorts`
    db.all(query, callback)
  }

  static where(db,data){
    let query = `SELECT * FROM Cohorts WHERE ${arg}`
    db.all(query, callback)
  }

}

export default Cohort
