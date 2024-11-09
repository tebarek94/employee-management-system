const db = require("./db");

// Create new employee
const createEmployee = (employee, callback) => {
  const { first_name, last_name, email, phone, position, date_of_joining } =
    employee;
  const query = `INSERT INTO employees (first_name, last_name, email, phone, position, date_of_joining) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [first_name, last_name, email, phone, position, date_of_joining],
    callback
  );
};

// Get all employees
const getAllEmployees = (callback) => {
  const query = "SELECT * FROM employees";
  db.query(query, callback);
};

// Get employee by ID
const getEmployeeById = (id, callback) => {
  const query = "SELECT * FROM employees WHERE id = ?";
  db.query(query, [id], callback);
};

// Update employee by ID
const updateEmployee = (id, updatedData, callback) => {
  const { first_name, last_name, email, phone, position, date_of_joining } =
    updatedData;
  const query = `UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone = ?, position = ?, date_of_joining = ? WHERE id = ?`;
  db.query(
    query,
    [first_name, last_name, email, phone, position, date_of_joining, id],
    callback
  );
};

// Delete employee by ID
const deleteEmployee = (id, callback) => {
  const query = "DELETE FROM employees WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
