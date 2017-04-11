"use strict"

class Student {
  constructor(first_name, last_name, cohort_id, id) {
    this._fName = first_name
    this._lName = last_name
    this._cohortId = cohort_id
    this._id = id
  }

  static create(model, obj) {
    let db = model,
        SEED_DATA_STUDENT = `INSERT INTO student(first_name, last_name, cohort_id) VALUES ('${obj._fName}', '${obj._lName}', '${obj._cohortId}' )`
    db.serialize( () => {
      db.run(SEED_DATA_STUDENT, (err) => {
        if (!err) {
          console.log(`'${obj._fName}' berhasil diSeed !`);
        } else {
          console.log(err.message);
        }
      })
    })
  }

  static update(model, obj) {
    let db = model,
        UPDATE_DATA = `UPDATE student SET first_name = '${obj._fName}', last_name = '${obj._lName}', cohort_id = '${obj._cohortId}' WHERE id = '${obj._id}';`
    db.serialize(() => {
      db.run(UPDATE_DATA, (err) => {
        if (!err) {
          console.log(`'${obj._fName}' berhasil diUpdate !`);
        } else {
          console.log(err.message);
        }
      })
    })
  }

  static delete(model, id) {
    let db = model,
        DELETE_DATA = `DELETE FROM student WHERE id = '${id}'`
    db.serialize( () => {
      db.run(DELETE_DATA, (err) => {
        if (!err) {
          console.log(`Data berhasil diDelete !`);
        } else {
          console.log(err.message);
        }
      })
    })
  }

  static findById(db, id) {
    let FIND_DATA = `SELECT * FROM student WHERE id = '${id}'`
    db.serialize( () => {
      db.all(FIND_DATA, (err, data) => {
        if (!err) {
          console.log(data)
        } else {
          console.log(err.message)
        }
      })
    })
  }

  static where(db, first_name, callback) {
    let FIND_DATA = `SELECT * FROM student WHERE ${first_name}`
    db.serialize( () => {
      db.all(FIND_DATA, (err, data) => {
        if (!err) {
          callback(data, null)
        } else {
          callback(null, err)
        }
      })
    })
  }

  static findAll(db, obj, callback) {
    let FIND_ALL = `SELECT * FROM student LIMIT ${obj.limit} OFFSET ${obj.offset}`
    db.serialize(function() {
      db.all(FIND_ALL, function(err, data) {
        if(err) {
          callback(null, err)
        } else {
          callback(data, null)
        }
      })
    })
  }

  static findOrCreate(db, obj) {
    let SELECT_DATA = `SELECT * FROM student WHERE last_name = '${obj._lName}'`
    let INSERT_DATA = `INSERT INTO student(cohort_id, first_name, last_name) VALUES (${obj._cohortId}, '${obj._fName}', '${obj._lName}')`

    db.serialize(function() {
      db.all(SELECT_DATA, function(err, data) {
        if(data.length){
          console.log(`data '${obj._fName}' '${obj._lName}' sudah ada!`)
        } else {
          db.run(INSERT_DATA, function(err) {
            if(err){
              console.log(err)
            } else {
              console.log(`data '${obj._fName}' '${obj._lName}' berhasil ditambahkan`)
            }
          })
        }
      })
    })
  }

}

export default Student
