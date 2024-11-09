import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";
import "../styles/EmployeeList.css"; // Import the CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then((data) => setEmployees(data));
  }, []);

  const handleDelete = (id) => {
    deleteEmployee(id).then(() => {
      setEmployees(employees.filter((employee) => employee.id !== id));
    });
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/edit/${employee.id}`}>Edit</Link> |{" "}
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add" className="add-new">
        Add New Employee
      </Link>
    </div>
  );
};

export default EmployeeList;
