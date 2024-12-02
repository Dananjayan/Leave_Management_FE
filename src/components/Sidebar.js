import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.css"; // Corrected path for App.css

const Sidebar = () => {
  const location = useLocation();

  // Check if the current route is the login page
  if (location.pathname === "/") {
    return null; // Hide the sidebar on the login page
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/myrecords"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Records
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/applicationlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Application List
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
