import React from "react";
import { useNavigate } from "react-router-dom";


const PortalPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to the login page
    navigate("/");
  };

  return (
    <div className="portal-page">
      {/* Header Section */}
      <div className="portal-header">
        <h1 className="head">Leave Management System</h1>
        <button className="logout-button" onClick={handleLogout}>
          Login
        </button>
      </div>

      {/* About Us Section */}
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
          pharetra elit. Suspendisse potenti. Quisque aliquam justo ut ipsum
          porta ullamcorper. Curabitur ac lectus hendrerit, tristique sem in,
          cursus sapien. Vivamus metus augue, pharetra ac lobortis vel,
          eleifend sed diam.
        </p>
      </div>
      <footer className="dashboard-footer">
        <h7>
          Copyright © 2024. All rights reserved. LMS (by: SBV Technologies) v1.0
        </h7>
      </footer>
    </div>
  );
};

export default PortalPage;
