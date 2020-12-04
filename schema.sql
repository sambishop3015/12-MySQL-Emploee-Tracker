-- Create new database
CREATE database employee_trackerDB;

-- Work in this database
USE employee_trackerDB;

-- Create new table
CREATE TABLE department (
  -- Typically id INT NOT NULL AUTO-INCREMENT
  department_id INT NOT NULL UNSIGNED AUTO-INCREMENT PRIMARY KEY,
  department VARCHAR(30) UNIQUE NOT NULL
);

-- Create new table
CREATE TABLE role (
  -- Typically id INT NOT NULL AUTO-INCREMENT
  role_id INT NOT NULL UNSIGNED AUTO-INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Create new table
CREATE TABLE employee (
  -- Typically id INT NOT NULL AUTO-INCREMENT
  id INT NOT NULL AUOT-INCREMENT UNSIGNED PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
);
