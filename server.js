//Dependencies 
const inquirer = require("inqurirer");
const mysql = require("mysql");
const express = require("express");

//Connection information for sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",

    password: "",
    database: "employee_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("SQL connected");
    start();
});
function start(){
    inquirer
        .promt([
            {
                type: "list",
                name: "start",
                message: "information on employees, departments and roles. What would you like to do?",
                choices: ["View", "Add", "Update", "Exit"]
            }
        ]).then (function(res){
            switch(res.start){
                case "View":
                      view();
                      break;
                case "Add":
                    add();
                    break;
                case "Update":
                    updateEmployee();
                    break;
                case "Exit":
                    console.log("------------------------");
                    console.log("All Done");
                    console.log("-------------------------");
                    break;
                default:
                    console.log("defult");
            }
        })
        function view(){
            inquirer
                .promt([
                    {
                        type: "list",
                        name: "view",
                        message: "Select one to view",
                        choices: ["All Employees", "By Department", "By Role"]
                    }
                ]).then(function(res){
                    switch(res.view){
                        case "All Employees":
                            viewAllEmployees();
                            break;
                        case "By Department":
                            viewByDepartment();
                            break;
                        case "By Role":
                            viewByRole();
                            break;
                    }
                })
        }
}