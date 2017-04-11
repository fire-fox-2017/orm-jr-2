"use strict"
const repl = require('repl')
import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let db = new DBModel('./db/student.db')

class Help{
  help() {
    console.log(`\n HELP MENU \n =========================================================================== \n
    1. STUDENT HELP MENU         >> Help.studentHelp()\n
    2. COHORT HELP MENU          >> Help.cohortHelp()`)
  }

  studentHelp() {
    console.log(`\n STUDENT HELP MENU \n =========================================================================== \n
    1. create student             >> Student.create(dbModel.connection, new Student("akan", "dihapus", 1))\n
    2. update student             >> Student.update(dbModel.connection, new Student("object", "dihapus", 1, 5))\n
    3. delete student             >> Student.delete(dbModel.connection, 5)\n
    4. find student byId          >> Student.findById(dbModel.connection, 2)\n
    5. find All student           >> Student.findAll(dbModel.connection, function(data, err) {
                                        if(!err){
                                          for(let i = 0; i < data.length; i++){
                                            console.log(data[i])
                                          }
                                        } else {
                                          console.log('Error')
                                        }
                                      })\n
    6. tampilkan berdasar atribut >> Student.where(dbModel.connection,"first_name = 'ridho' ", function(data, err) {
                                        if(!err){
                                          for(let i = 0; i < data.length; i++){
                                            console.log(data[i])
                                          }
                                        }else {
                                          console.log('Error')
                                        }
                                      })
    7. find or create              >> Student.findOrCreate(dbModel.connection, new Student("ridho", "pratama", 1))`)
  }

  cohortHelp() {
    console.log(`\n COHORT HELP MENU \n =========================================================================== \n
    1. create cohort             >> Cohort.create(dbModel.connection, new Cohort("name"))\n
    2. update cohort             >> Cohort.update(dbModel.connection, new Cohort("name", 1))\n
    3. delete cohort             >> Cohort.delete(dbModel.connection, 1)\n
    4. find cohort byId          >> Cohort.findById(dbModel.connection, 1)\n
    5. find All cohort           >> Cohort.findAll(dbModel.connection, function(data, err) {
                                        if(!err){
                                          for(let i = 0; i < data.length; i++){
                                            console.log(data[i])
                                          }
                                        } else {
                                          console.log('Error')
                                        }
                                      })\n
    6. tampilkan berdasar atribut >> Cohort.where(dbModel.connection,"first_name = 'Ridho' ", function(data, err) {
                                        if(!err){
                                          for(let i = 0; i < data.length; i++){
                                            console.log(data[i])
                                          }
                                        }else {
                                          console.log('Error')
                                        }
                                      })`)
  }
}
// let help = new Help().help

let start = repl.start('> ')
start.context.dbModel = db
start.context.Student = Student
start.context.Cohort  = Cohort
start.context.help    = new Help().help
start.context.Help    = new Help()

/*
 Student.create(dbModel.connection, new Student("akan", "dihapus", 1))
 Student.update(dbModel.connection, new Student("object", "dihapus", 1, 5))
 Student.delete(dbModel.connection, 5)
 Student.findById(dbModel.connection, 2)

Student.findAll(dbModel.connection, function(data, err) {
  if(!err){
    for(let i = 0; i < data.length; i++){
      console.log(data[i])
    }
  } else {
    console.log('Error')
  }
})*/
// Student.where(dbModel.connection,"first_name = 'ridho' ", function(data, err) {
//   if(!err){
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i])
//     }
//   }else {
//     console.log('Error')
//   }
// })

// Cohort.create(dbModel.connection, new Cohort("Co"))
// Cohort.update(dbModel.connection, new Cohort("ob", 1))
// Cohort.delete(dbModel.connection, 5)
// Cohort.findById(dbModel.connection, 2)
