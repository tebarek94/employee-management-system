// src/App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeDetail from "./components/EmployeeDetail";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Employee Management System</h1>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />{" "}
          {/* Route for Employee Detail */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
