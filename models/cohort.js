"use strict"

import Student from "./student.js";

class Cohort {
  static create(db, name){
    let ADD_COHORT = `INSERT INTO cohorts (name) VALUES (?)`
    db.serialize(function(){
	    db.run(ADD_COHORT, [name], function(err){
	      if (err) {
	        console.log(err);
	      } else {
	        console.log(`${name} succesfully added to the cohorts table`);
	        return true
	      }
	    })
    })
  }

  static show(db){
    let SHOW_ALL_COHORT = `SELECT * FROM cohorts`
    db.each(SHOW_ALL_COHORT, function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static delete(db, id){
    let DELETE_COHORT = `DELETE FROM cohorts WHERE id = ${id}`
	  db.serialize(function(){
	    db.run(DELETE_COHORT, function(err){
	      if (err) {
	        console.log(err);
	      } else {
	        console.log(`Cohort with ${id} deleted`);
	      }
	    })
	  })
  }

}

export default Cohort
