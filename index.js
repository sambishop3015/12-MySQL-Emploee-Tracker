var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    runSearch() {
        inquirer
            .prompt({
                name: "action",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    "Add department",
                    "Add role",
                    "Add employee",
                    "View departments",
                    "View roles",
                    "View employees",
                    "Update employee role",
                    "Exit"
                ]
            })
            .then(function (answer) {
                switch (answer.action) {
                    case "Add department":
                        // inquirer
                        //     .prompt({
                        //         name: "department",
                        //         type: "input",
                        //         message: "What department do you want to add?"
                        //     })
                        departmentCreate();
                        break;

                    case "Add role":
                        roleCreate();
                        break;

                    case "Add employee":
                        employeeCreate();
                        break;

                    case "View departments":
                        departmentRead();
                        break;

                    case "View roles":
                        rolesRead();
                        break;

                    case "View employees":
                        employeesRead();
                        break;

                    case "Update employees role":
                        employeesRoleUpdate();
                        break;

                    case "Exit":
                        connection.end();
                        break;
                }
            });
    };

    departmentCreate() {
        inquirer
            .prompt({
                name: "department",
                type: "input",
                message: "What department do you want to add?"
            })
            .then(function (answer) {
                var query = "INSERT INTO department SET ?";
                connection.query(query, { name: answer.department }, function (err) {
                    if (err) throw err;
                    console.log('Department created: ' + answer.department)
                    runSearch();
                });
            })
    };

    roleCreate() {
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What's the title of the role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What's the salary?"
                },
                {
                    name: "department",
                    type: "rawlist",
                    message: "What department will this role be in?",
                    choices: [departmentList()]
                    // "",
                    // "Add role",
                    // "Add employee",
                    // "View departments",
                    // "View roles",
                    // "View employees",
                    // "Update employee role",
                    // "Exit"
                }
            ])
            .then(function (answer) {
                var query = "INSERT INTO role SET ?";
                connection.query(query,
                    {
                        name: answer.title,
                        salary: answer.salary,
                        department_id: answer.department
                    }, function (err) {
                        if (err) throw err;
                        console.log("Role created: " + answer.role);
                        runSearch();
                    });
            });
    }

    employeeCreate() {
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "First name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Last name?"
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "Employee role?",
                    choices: [roleList()]
                    // "",
                    // "Add role",
                    // "Add employee",
                    // "View departments",
                    // "View roles",
                    // "View employees",
                    // "Update employee role",
                    // "Exit"
                },
                {
                    name: "manager",
                    type: "rawlist",
                    message: "Employee manager?",
                    choices: [managerList()]
                    // "",
                    // "Add role",
                    // "Add employee",
                    // "View departments",
                    // "View roles",
                    // "View employees",
                    // "Update employee role",
                    // "Exit"
                }
            ])
            .then(function (answer) {
                var query = "INSERT INTO employee SET ?";
                connection.query(query,
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role,
                        manager_id: answer.manager
                    }, function (err) {
                        if (err) throw err;
                        console.log("Role created: " + answer.role);
                        runSearch();
                    });
            });
    }


    //var myJSON;

    departmentList() {
        var query = "SELECT name FROM department";
        connection.query(query, function (err, res) {
            if (err) throw err;
            var myJSON = JSON.stringify(res);
            var split = myJSON.split("name:")

            function getFields(input, field) {
                var output = [];
                for (var i = 0; i < input.length; ++i)
                    output.push(input[i][field]);
                return output;
            }

            var result = getFields(myJSON, "name"); // returns [ 1, 3, 5 ]


            console.log(result);
            //runSearch();
        });
    };

    departmentRead() {
        var query = "SELECT id, name FROM department ORDER BY id";
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        })
    }

    rolesRead() {
        var query = "SELECT id, title, salary, department_id FROM role ORDER BY id";
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        })
    }

    employeesRead() {
        var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee ORDER BY id";
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        })
    }

    employeesRoleUpdate() {
        inquirer
            .prompt({
                name: "department",
                type: "input",
                message: "What department would you like to create?"
            })
            .then(function (answer) {
                var query = "INSERT INTO department SET ?";
                connection.query(query, { name: answer.department }, function (err) {
                    if (err) throw err;
                    console.log("Department created: " + answer.department);
                    runSearch();
                });
            });
    }

    //   console.log('Change Role');
    //   inquirer
    //     .prompt([
    //       {
    //         name: "first_name",
    //         type: "input",
    //         message: "First name?"
    //       },
    //       {
    //         name: "last_name",
    //         type: "input",
    //         message: "Last name?"
    //       },
    //       {
    //         name: "role",
    //         type: "rawlist",
    //         message: "Employee role?",
    //         choices: //[roleList(), roleCreate()]
    //           [
    //             "CEO",
    //             "Operations Manager",
    //             "Human Resources",
    //             "Project Manager",
    //             "Project Coordinator",
    //             "Accountant",
    //             "Site Supervisor"
    //           ]
    //       }
    //     ])
    //     .then(function (answer) {
    //       var query = "UPDATE employee SET ? WHERE ?";
    //       connection.query(query, [
    //         {
    //           role_id: answer.role
    //         },
    //         {
    //           first_name: answer.first_name,
    //         }// },
    //         // {
    //         //   last_name: answer.last_name
    //         // }
    //       ],
    //         function (err) {
    //           if (err) throw err;
    //           console.log("Role changed to: " + answer.role);
    //           runSearch();
    //         });
    //     });
    // }
}

module.exports = new DB(connection);