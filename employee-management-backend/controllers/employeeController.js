const employeeModel = require("../models/employeeModel.js");

// Get all employees
const getAllEmployees = (req, res) => {
  employeeModel.getAllEmployees((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving employees", error: err });
    }
    res.status(200).json(results);
  });
};

// Create a new employee
const createEmployee = (req, res) => {
  const newEmployee = req.body;
  employeeModel.createEmployee(newEmployee, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating employee", error: err });
    }
    res
      .status(201)
      .json({ message: "Employee created successfully", id: results.insertId });
  });
};

// Get an employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;
  employeeModel.getEmployeeById(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(results[0]);
  });
};

// Update an employee by ID
const updateEmployee = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  employeeModel.updateEmployee(id, updatedData, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating employee", error: err });
    }
    res.status(200).json({ message: "Employee updated successfully" });
  });
};

// Delete an employee by ID
const deleteEmployee = (req, res) => {
  const { id } = req.params;
  employeeModel.deleteEmployee(id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting employee", error: err });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
