// src/components/EmployeeDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // We still use useParams for getting the ID
import { getEmployeeById } from "../services/employeeService";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((data) => setEmployee(data))
        .catch((error) =>
          console.error("Error fetching employee data:", error)
        );
    }
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <div>
        <h3>
          {employee.first_name} {employee.last_name}
        </h3>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>Position:</strong> {employee.position}
        </p>
        <p>
          <strong>Date of Joining:</strong>{" "}
          {new Date(employee.date_of_joining).toLocaleDateString()}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(employee.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(employee.updated_at).toLocaleString()}
        </p>
      </div>

      {/* Button to navigate back to the employee list */}
      <button onClick={() => navigate("/")}>Back to Employee List</button>
    </div>
  );
};

export default EmployeeDetail;
