"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id) {
    this._cohort_name = name
    this._id = id
  }

  static create(db, obj) {
    let SEED_DATA_COHORT = `INSERT INTO cohort(cohort_name) VALUES ('${obj._cohort_name}')`
    db.serialize( () => {
      db.run(SEED_DATA_COHORT, (err) => {
        if(!err) {
          console.log(`data cohort '${obj._cohort_name}' berhasil ditambah !`)
        } else {
          console.log(err.message)
        }
      })
    })
  }

  static update(db, obj) {
    let UPDATE_DATA = `UPDATE cohort SET cohort_name = '${obj._cohort_name}' WHERE id = '${obj.id}'`
    db.serialize( () => {
      db.run(UPDATE_DATA, (err) => {
        if(!err) {
          console.log(`data cohort '${obj._cohort_name}' berhasil diUpdate !`)
        } else {
          console.log(err.message)
        }
      })
    })
  }

  static delete(db, id) {
    let DELETE_DATA = `DELETE FROM cohort WHERE id = '${id}'`
    db.serialize( () => {
      db.run(DELETE_DATA, (err) => {
        if(!err) {
          console.log(`data cohort '${obj._cohort_name}' berhasil diDelete !`)
        } else {
          console.log(err.message)
        }
      })
    })
  }

  static findById(db, id) {
    let FIND_DATA = `SELECT * FROM cohort WHERE id = '${id}'`
    db.serialize( () => {
      db.each(FIND_DATA, (err, data) => {
        if(!err) {
          console.log(data)
        } else {
          console.log(err.message)
        }
      })
    })
  }

  static findAll(db, callback) {
    let FIND_ALL = `SELECT * FROM cohort`
    db.serialize( () => {
      db.all(FIND_ALL, (err, data) => {
        if(!err) {
          callback(data, null)
        } else {
          callback(null, err.message)
        }
      })
    })
  }
  static where(db, cohort_name, callback) {
    let FIND_NAME = `SELECT * FROM cohort WHERE ${cohort_name};`
    db.serialize(function() {
      db.all(FIND_NAME, function(err, data) {
        if(err) {
          callback(null, err.message)
        } else {
          callback(data, null)
        }
      })
    })
  }

  static findAll(db, obj, callback) {
    let FIND_ALL = `SELECT * FROM cohort LIMIT ${obj.limit} OFFSET ${obj.offset}`
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
    let SELECT_DATA = `SELECT * FROM cohort WHERE cohort_name = '${obj._cohort_name}'`
    let INSERT_DATA = `INSERT INTO cohort(cohort_name) VALUES ('${obj._cohort_name}')`

    db.serialize(function() {
      db.all(SELECT_DATA, function(err, data) {
        if(data.length){
          console.log(`data '${obj._cohort_name}' sudah ada!`)
        } else {
          db.run(INSERT_DATA, function(err) {
            if(err){
              console.log(err)
            } else {
              console.log(`data '${obj._cohort_name}' berhasil ditambahkan`)
            }
          })
        }
      })
    })
  }

}

export default Cohort
