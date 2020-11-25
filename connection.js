var mysql = require("mysql");
var app = require('index.js')

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  app.runSearch();
});