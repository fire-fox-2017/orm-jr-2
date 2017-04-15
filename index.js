"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let argv = process.argv;
const repl = require('repl');
const replServer = repl.start({
    prompt: '> '
});

if (argv.length > 2) {
    argv.shift();
    argv.shift();
    if (argv[0] == "playtime") {
        replServer.context.dbModel = new DBModel('./db/student.db');
        replServer.context.Student = Student;
        replServer.context.Cohort = Cohort;
        replServer.context.help = function help() {
            console.log("dbModel");
            console.log("dbModel.setup()");
        };
        replServer.context.crs = function temp() {
            console.log("Student.create(dbModel.connection, new Student('','',))")
        };
        replServer.context.crc = function temp() {
            console.log("Cohort.create(dbModel.connection, new Cohort(''))")
        };
        replServer.context.ups = function temp() {
            console.log("Student.update(dbModel.connection, new Student('','',,))")
        };
        replServer.context.upc = function temp() {
            console.log("Cohort.update(dbModel.connection, new Cohort('',))")
        };
        replServer.context.dels = function temp() {
            console.log("Student.delete(dbModel.connection, )")
        };
        replServer.context.delc = function temp() {
            console.log("Cohort.delete(dbModel.connection, )")
        };
        replServer.context.f1s = function temp() {
            console.log("Student.findById(dbModel.connection, )")
        };
        replServer.context.f1c = function temp() {
            console.log("Cohort.findById(dbModel.connection, )")
        };
        replServer.context.f2s = function temp() {
            console.log(`Student.findAll(dbModel.connection,function(data,err){if (!err) {for (var i = 0; i < data.length; i++) {console.log(data[i]);}}else{console.log('Error');}})`);
        }
        replServer.context.f2c = function temp() {
            console.log(`Cohort.findAll(dbModel.connection,function(data,err){if (!err) {for (var i = 0; i < data.length; i++) {console.log(data[i]);}}else{console.log('Error');}})`);
        }
        replServer.context.f3s = function temp() {
            console.log(`Student.where(dbModel.connection,"firstname = 'Windi' ",function(data,err){if (!err) {for (var i = 0; i < data.length; i++) {console.log(data[i]);}}else{console.log('Error');}})`);
        }
        replServer.context.f3c = function temp() {
            console.log(`Cohort.where(dbModel.connection,"firstname = 'Windi' ",function(data,err){if (!err) {for (var i = 0; i < data.length; i++) {console.log(data[i]);}}else{console.log('Error');}})`);
        }
        replServer.context.f4s = function temp() {
            console.log(`Student.findAll2(dbModel.connection,{limit:2, offset:1},function(data,err){if(!err){for(var i=0;i<data.length;i++){console.log(data[i]);}}else{console.log('Error');}})`);
        }
        replServer.context.fcs = function temp() {
            console.log("Student.findOrCreate(dbModel.connection, new Student('','',))");
        };
    } else {

    }
} else {
    console.log("You not type command");
}
