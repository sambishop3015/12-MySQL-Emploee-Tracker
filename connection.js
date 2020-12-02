var mysql = require("mysql");
var inquirer = require("inquirer");
//var app = require('./index')
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_trackerdb"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
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
        "View employees by manager",
        "View department budget",
        "Update employee's role",
        "Update employee's manager",
        "DELETE a department",
        "DELETE a role",
        "DELETE a employee",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
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

        case "View employees by manager":
          employeesByManagerRead();
          break;

        case "View department budget":
          departmentBudgetView();
          break;

        case "Update employee's role":
          employeesRoleUpdate();
          break;

        case "Update employee's manager":
          employeesManagerUpdate();
          break;

        case "DELETE a department":
          departmentDelete();
          break;

        case "DELETE a role":
          roleDelete();
          break;

        case "DELETE a employee":
          employeeDelete();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};

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


function roleCreate() {
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
        message: 'Department ID?',
        name: "department_id"
      }
    ])
    .then(function (answer) {
      connection.query('INSERT INTO role SET ?',
        {
          role: answer.role,
          salary: answer.salary,
          department_id: answer.department_id
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