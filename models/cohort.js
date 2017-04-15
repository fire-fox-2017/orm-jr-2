"use strict"

import Student from "./student.js";

class Cohort {
    constructor(name, id) {
        this.name = name || "";
        this.id = id || 0;
    }
    static create(db, obj) {
        db.serialize(function() {
            db.run(`INSERT INTO cohort (name) VALUES ('${obj.name}')`, function(err) {
                if (err) {
                    console.log('Error Input cohort : ' + err);
                } else {
                    console.log('Insert cohort success.');
                }
            });
        });
    }
    static update(db, obj) {
        db.serialize(function() {
            db.run(`UPDATE cohort SET name = '${obj.name}' where id=${obj.id}`, function(err) {
                if (err) {
                    console.log('Error Update cohort : ' + err);
                } else {
                    console.log('Update cohort success.');
                }
            });
        });
    }
    static delete(db, value) {
        db.serialize(function() {
            db.run(`UPDATE student SET cohort_id = ${null} where cohort_id='${value}'`, function(err) {
                if (err) {
                    console.log('Error Delete cohort : ' + err);
                } else {
                    console.log('Delete cohort success.');
                }
            });
            db.run(`DELETE FROM cohort where id=${value}`, function(err) {
                if (err) {
                    console.log('Error Delete cohort : ' + err);
                } else {
                    console.log('Delete cohort success.');
                }
            });
        });
    }
    static findById(db, value) {
        db.serialize(function() {
            db.each(`SELECT * FROM cohort where id=${value}`, function(err, row) {
                if (err) {
                    console.log('Error findById cohort : ' + err);
                } else {
                    let temp = JSON.stringify(row);
                    console.log(temp);
                }
            });
        });
    }
    static findAll(db, callback) {
        db.serialize(function() {
            db.all(`SELECT * FROM  cohort `, function(err, row) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(row, err);
                }
            });
        });
    }
    static where(db, str, callback) {
        db.serialize(function() {
            db.all(`SELECT * FROM  cohort where ${str} `, function(err, row) {
                if (err) {
                    callback(null, err);
                } else {
                    callback(row, err);
                }
            });
        });
    }
}

export default Cohort
