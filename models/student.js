"use strict"

class Student {
  constructor(firstname,lastname,cohort,id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort = cohort
    this.id = id
  }
  static create(connection, data){
    let db = connection
    let query = `INSERT INTO Students (firstname, lastname, cohort_id) VALUES ('${data.firstname}','${data.lastname}','${data.cohort}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(err){
          console.log(err.message);
        } else {
          console.log('SUCCESS');
        }
      })
    })
  }

  static update(connection, data){
    let db = connection
    let query = `UPDATE Students SET firstname = '${data.firstname}', lastname = '${data.lastname}', cohort_id = '${data.cohort}' WHERE ID = ${data.id}`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(err){
          console.log(err.message);
        } else {
          console.log('SUCCESS');
        }
      })
    })
  }

  static delete(connection,data){
    let db = connection
    let query = `DELETE FROM Students WHERE ID = ${data}`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(err){
          console.log(err.message);
        } else {
          console.log('SUCCESS');
        }
      })
    })
  }

  static findById(db,data){
    // let db = connection
    let query = `SELECT * FROM Students WHERE ID = ${data}`
    db.all(query,(err, data)=>{
      if(err){
        console.log(err.message);
      } else {
        console.log(data);
      }
    })
  }

  static findAll(db,limit,callback){
    // console.log(limit.limit);
    // console.log(limit.offset);
    let query = `SELECT * FROM Students LIMIT ${limit.limit} OFFSET ${limit.offset}`
    db.all(query, callback)
  }

  static where(db,arg,callback){
    let query = `SELECT * FROM Students WHERE ${arg}`
    db.all(query, callback)
  }

  static findOrCreate(db,data){
    // console.log(typeof data.firstname);
    let query = `SELECT * FROM Students WHERE firstname = '${data.firstname}' AND lastname = '${data.lastname}' AND cohort_id = '${data.cohort}'`
    db.get(query,(err,file)=>{
      if(err){
        console.log(err);
      } else {
        if(file == undefined){
          let insert_query = `INSERT INTO Students (firstname, lastname, cohort_id) VALUES ('${data.firstname}','${data.lastname}','${data.cohort}')`
          db.serialize(()=>{
            db.run(insert_query, (err)=>{
              if(err){
                console.log(err.message);
              } else {
                console.log(`Data Insert Success`);
              }
            })
          })
        } else {
          console.log(`Datanya udah ada coy`);
        }
      }
    })
  }


}

export default Student
