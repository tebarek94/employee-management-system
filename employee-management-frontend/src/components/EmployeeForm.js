import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";
import "../styles/EmployeeForm.css"; // Import CSS file

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    date_of_joining: "",
  });

  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate(); // Initialize navigate for routing

  // Fetch employee data if id is available (i.e., edit form)
  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((data) => {
          // Ensure we don't try to set data if it's undefined or null
          if (data) {
            setFormData(data);
          } else {
            navigate("/"); // Redirect if employee not found
          }
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
          navigate("/"); // Redirect in case of error (could be network issues or invalid ID)
        });
    }
  }, [id, navigate]); // Dependency on id and navigate

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (either create or update employee)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Perform validation before submitting (optional but recommended)
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert("First Name, Last Name, and Email are required!");
      return;
    }

    try {
      if (id) {
        // If there's an ID, update the employee
        await updateEmployee(id, formData);
      } else {
        // If no ID, create a new employee
        await createEmployee(formData);
      }
      // Redirect after submission (either creation or update)
      navigate("/");
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />

        <label>Date of Joining:</label>
        <input
          type="date"
          name="date_of_joining"
          value={formData.date_of_joining}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      <button type="button" onClick={() => navigate("/")}>
        Back to Employee List
      </button>
    </div>
  );
};

export default EmployeeForm;
