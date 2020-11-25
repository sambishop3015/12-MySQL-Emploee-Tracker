var inquirer = require("inquirer");

module.exports = function (app) {
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
                    "Update employee role"
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

                    case "Update employees role":
                        employeesRoleUpdate();
                        break;
                }
            });
    }
}