"use strict"
const sqlite = require('sqlite3').verbose();


class DBModel {
  constructor(database) {
    this.database = database;
    this.connection = new sqlite.Database(this.database)
  }

  setup() {
    let db = this.connection;
		db.serialize(function(){
			let CREATE_TABLE_STUDENTS = 'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, id_cohort INTEGER NOT NULL);';
      let CREATE_TABLE_COHORTS = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name varchar(255) NOT NULL UNIQUE);`;
      db.run(CREATE_TABLE_STUDENTS,function(err) {
				if(err){console.log(err)} else {console.log('Table students created')}
			});
      db.run(CREATE_TABLE_COHORTS, (err) => {
          if (err) {console.log(err)} else {console.log('Table cohorts created')}
      });
		});
	}
}

export default DBModel;
