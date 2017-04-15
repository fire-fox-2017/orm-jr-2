import DBModel from "../models/db_model.js";
import Student from "../models/student.js";

var myDB = new DBModel("./db/test.db")
var temp = 0;
myDB.setup();

Student.create(myDB.connection, new Student('Rifka', 'Rasa', 2));
myDB.connection.serialize(function() {
    myDB.connection.each(`SELECT * FROM  student where firstname = 'Rifka'`, function(err, row) {
        if (!err) {
            if (row.id > 0) {
                temp = row.id;
                console.log(`test create student : success\n`);
                updateCheck()
                    .then(function(result) {
                        console.log(result);
                    }).catch(function(err) {
                        console.log(err);
                    });
            } else {
                console.log(`test create student : failed\n`);
            }
        }
    });
});

function updateCheck() {
    return new Promise(function(resolve, reject) {
        Student.update(myDB.connection, new Student('Raisa', 'Rasa', 2, temp));
        myDB.connection.serialize(function() {
            myDB.connection.each(`SELECT * FROM  student where firstname = 'Raisa'`, function(err, row) {
                if (!err) {
                    if (row.id > 0) {
                        resolve(`test update student : success\n`);
                        deleteCheck()
                            .then(function(result) {
                                console.log(result);
                            }).catch(function(err) {
                                console.log(err);
                            });
                    } else {
                        reject(`test update student : failed\n`);
                    }
                }
            });
        });
    })
}

function deleteCheck() {
    return new Promise(function(resolve, reject) {
        Student.delete(myDB.connection, temp);
        myDB.connection.serialize(function() {
            myDB.connection.each(`SELECT * FROM  student where firstname = 'Raisa'`, function(err, row) {
                if (!err) {
                    if (row.id > 0) {
                        resolve(`test delete student : failed`);
                    } else {
                        reject(`test delete student : success`);
                    }
                }
            });
        });
    })
}
