"use strict"

import Student from "./student.js";

class Cohort {
  static create(db, name){
    let ADD_COHORT_QUERY = `INSERT INTO cohorts (name) VALUES (?)`
    db.serialize(function(){ 
	    db.run(ADD_COHORT_QUERY, [name], function(err){
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
    let SHOW_ALL_COHORT_QUERY = `SELECT * FROM cohorts`
    db.each(SHOW_ALL_COHORT_QUERY, function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static delete(db, id){
    let DELETE_COHORT_QUERY = `DELETE FROM cohorts WHERE id = ${id}`
	  db.serialize(function(){    
	    db.run(DELETE_COHORT_QUERY, function(err){
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