import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState("");

  console.log(dashboard, "dashboard");

  let emp_id = localStorage.getItem("empid");

  useEffect(() => {
    axios
      .post("http://localhost:4000/dashboard", { emp_id })
      .then(function (response) {
        if (response.data.success === true) {
          setDashboard(response.data.user);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error fetching employee details:", error);
      });
  }, [emp_id]);

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Add Sidebar Component */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Leave Management System - Admin</h1>
          <div className="user-info">
            <span>vegeta</span>
            <button className="logout-button">Logout</button>
          </div>
        </div>
        <div className="main-content">
          <h2>Welcome to Leave Management System</h2>
          <div className="card-container">
            <div className="card">
              <h3>Pending Applications</h3>
            </div>
            <div className="card">
              <h3>Upcoming Leave</h3>
            </div>
          </div>
        </div>
      </div>
      <footer className="dashboard-footer">
        <h7>
          Copyright © 2024. All rights reserved. LMS (by: SBV Technologies) v1.0
        </h7>
      </footer>
    </div>
  );
};

export default DashboardPage;
