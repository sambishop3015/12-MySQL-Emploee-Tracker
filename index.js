var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
const connection = require('./connection');

function departmentCreate() {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "What department do you want to add?"
      })
      .then(function (answer) {
        var query = "INSERT INTO department SET ?";
        connection.query(query, { department: answer.department }, function (err) {
          if (err) throw err;
          console.log('Department created: ' + answer.department)
          runSearch();
        });
      })
  };
  
  let departmentArray = [];
  
  function roleCreate() {
    //const choices = await makeDepartmentArray();
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What role do you want to add?',
          name: "role"
        },
        {
          type: 'input',
          message: 'Salary?',
          name: "salary"
        },
        {
          type: 'input',
          //type: 'list',
          message: 'Department ID?',
          name: "department_id",
          //name: "department",
          //choices: departmentArray
        }
      ])
      .then(function (answer) {
        // let id;
  
        // connection.query('SELECT * FROM department WHERE department = ?'), [answer.department],
        //   function (err, res) {
        //     if (err) throw err;
        //     id = res.department_id;
        //   }
  
        connection.query('INSERT INTO role SET ?',
          {
            role: answer.role,
            salary: answer.salary,
            department_id: answer.department_id
            //department_id: id
          },
          function (err) {
            if (err) throw err;
            console.log('Role created: ' + answer.role)
            runSearch();
          });
      })
  }
  
  function employeeCreate() {
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
          name: "role_id",
          type: "input",
          message: "Employee role ID?"
        },
        {
          name: "manager_id",
          type: "input",
          message: "Employee manager ID?"
        }
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
          },
          function (err) {
            if (err) throw err;
            console.log("Employee created: " + answer.first_name + " " + answer.last_name);
            runSearch();
          });
      });
  }
  
  function departmentRead() {
    var query = "SELECT department_id, department FROM department ORDER BY department_id";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    })
  }
  
  function rolesRead() {
    connection.query("SELECT role_id, role, salary, department FROM role LEFT JOIN department ON role.department_id=department.department_id",
      function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
  }
  
  function employeesRead() {
    //var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee ORDER BY id";
    connection.query("SELECT id, first_name, last_name, role, salary, manager_id FROM employee LEFT JOIN role ON employee.role_id=role.role_id",
      function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      })
  }
  
  function employeesRoleUpdate() {
    //function departmentRead() {
    inquirer
      .prompt([
        {
          name: "employee_id",
          type: "input",
          message: "Which employee?"
        },
        {
          name: "role_id",
          type: "input",
          message: "What role ID to change to?"
        }
      ])
      .then(function (answer) {
        connection.query("UPDATE employee SET ? WHERE ?", [
          {
            role_id: answer.role_id
          },
          {
            id: answer.employee_id
          }
        ],
          function (err) {
            if (err) throw err;
            console.log("Employee ID: " + answer.employee_id + " changed to role ID: " + answer.role_id);
            runSearch();
          });
      });
  }
  
  function employeesManagerUpdate() {
    //function departmentRead() {
    inquirer
      .prompt([
        {
          name: "employee_id",
          type: "input",
          message: "Which employee ID?"
        },
        {
          name: "manager_id",
          type: "input",
          message: "What manager ID to change to?"
        }
      ])
      .then(function (answer) {
        connection.query("UPDATE employee SET ? WHERE ?", [
          {
            manager_id: answer.manager_id
          },
          {
            id: answer.employee_id
          }
        ],
          function (err) {
            if (err) throw err;
            console.log("Employee ID: " + answer.employee_id + " changed to manager ID: " + answer.manager_id);
            runSearch();
          });
      });
  }
  
  function employeesByManagerRead() {
    //function departmentRead() {
    inquirer
      .prompt(
        {
          name: "manager_id",
          type: "input",
          message: "Which manager ID to view by?"
        })
      .then(function (answer) {
        connection.query("SELECT * FROM employee WHERE manager_id = ?", [answer.manager_id],
          function (err, res) {
            if (err) throw err;
            console.log("Employees displayed by manager ID: " + answer.manager_id);
            console.table(res);
            runSearch();
          });
      });
  };
  
  function departmentDelete() {
    inquirer
      .prompt(
        {
          name: "department_id",
          type: "input",
          message: "Which department ID to DELETE?"
        })
      .then(function (answer) {
        connection.query("DELETE FROM department WHERE department_id = ?", [answer.department_id],
          function (err) {
            if (err) throw err;
            console.log("Department ID: " + answer.department_id + " DELETED!");
            runSearch();
          });
      });
  };
  
  function roleDelete() {
    inquirer
      .prompt(
        {
          name: "role_id",
          type: "input",
          message: "Which role ID to DELETE?"
        })
      .then(function (answer) {
        connection.query("DELETE FROM role WHERE role_id = ?", [answer.role_id],
          function (err) {
            if (err) throw err;
            console.log("Role ID: " + answer.role_id + " DELETED!");
            runSearch();
          });
      });
  };
  
  function employeeDelete() {
    inquirer
      .prompt(
        {
          name: "id",
          type: "input",
          message: "Which employee ID to DELETE?"
        })
      .then(function (answer) {
        connection.query("DELETE FROM employee WHERE id = ?", [answer.id],
          function (err, res) {
            if (err) throw err;
            console.log("Employee ID: " + answer.id + " DELETED!");
            runSearch();
          });
      });
  };
  
  function departmentBudgetView() {
    inquirer
      .prompt({
        name: "department_id",
        type: "input",
        message: "View budge => Department ID:"
      })
      .then(function (answer) {
        connection.query("SELECT salary FROM role WHERE department_id = ?", [answer.department_id],
          function (err, res) {
            if (err) throw err;
            let budget = 0;
            for (var i = 0; i < res.length; i++) {
              budget += res[i].salary;
            }
            console.log("$" + budget);
            runSearch();
          });
      });
  }
  
  
  function makeDepartmentArray() {
    connection.query("SELECT department FROM department",
      function (err, res) {
        if (err) throw err;
        //let array;
        for (var i = 0; i < res.length; i++) {
          let dept = res[i].department;
          departmentArray.push(dept);
        }
        //console.log(departmentArray);
        roleCreate();
      });
  };

module.exports = departmentCreate(); 
module.exports = roleCreate();
module.exports = employeeCreate();