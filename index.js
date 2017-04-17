"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
const replServer = repl.start({prompt: '> '})

replServer.context.dbModel = new DBModel()
replServer.context.Student = Student
replServer.context.Cohort = Cohort



// Student.create(dbModel.connection, new Student('Windiana','Krismanuyar',1))
// Student.update(dbModel.connection, new Student('Windi','Kris',1,1))
// Student.delete(dbModel.connection, 1)
// Student.findById(dbModel.connection, 1)
/* Student.findAll(dbModel.connection, {limit: 2, offset: 1}, function(err, data){
    if(!err){
      for(var i=0; i<data.length; i++){
        console.log(data[i]);
      }
    } else {
    console.log('error')
      }
  })
  // Student.findOrCreate(dbModel.connection, new Student("Windiana", "Krismanuyar", 1))
  */

  /* Student.where(dbModel.connection, "firstname = 'Windi' ", function(err, data){
      if(!err){
        for(var i=0; i<data.length; i++){
          console.log(data[i]);
        }
      } else {
      console.log('error')
        }
    })
    */

    // Cohort.create(dbModel.connection, new Cohort('gluk'))
    // Cohort.update(dbModel.connection, new Cohort('glee',1))
    // Cohort.delete(dbModel.connection, 1)
    // Cohort.findById(dbModel.connection, 1)
    /* Cohort.findAll(dbModel.connection, function(err, data){
        if(!err){
          for(var i=0; i<data.length; i++){
            console.log(data[i]);
          }
        } else {
        console.log('error')
          }
      })
      */

      /* Student.where(dbModel.connection, "firstname = 'Windi' ", function(err, data){
          if(!err){
            for(var i=0; i<data.length; i++){
              console.log(data[i]);
            }
          } else {
          console.log('error')
            }
        })
        */
