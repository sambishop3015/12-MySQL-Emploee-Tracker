-- Create new database
CREATE database employee_trackerDB;

-- Work in this database
USE employee_trackerDB;
-- Create new table
CREATE TABLE department (
  -- Typically id INT NOT NULL AUTO-INCREMENT
  id INT NOT NULL AUTO-INCREMENT,
  name VARCHAR(30) NULL,
  -- Make this the primary key
  PRIMARY KEY (id)
);

CREATE TABLE role (
  -- Typically id INT NOT NULL AUTO-INCREMENT
  id INT NOT NULL AUTO-INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  department_id INT NOT NULL,
  -- Make this the primary key
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  -- Typically id INT NOT NULL AUTO-INCREMENT
  id INT NOT NULL AUOT-INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  -- Make this the primary key
  PRIMARY KEY (id)
);
-- Open all rows (*) from this table
-- SELECT * FROM top5000;