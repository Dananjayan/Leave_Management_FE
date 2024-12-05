import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMyAccount = () => {
    console.log("Navigating to My Account");
    navigate("/myaccount");
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header">
      <h1>Leave Management System - Admin</h1>
      <div className="user-info">
        <button
          className="logout"
          onClick={() => setMenuOpen(true)}
        >
          Vegeta
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <button className="menu-item" onClick={handleMyAccount}>
              My Account
            </button>
            <button className="menu-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
