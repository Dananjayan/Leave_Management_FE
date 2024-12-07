import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMyAccount = () => {
    navigate("/myaccount");
  };

  return (
    <div className="header">
      <h1>Leave Management System - Admin</h1>
      <div className={`user-info ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <button className="logout" onClick={toggleMenu}>
          Vegeta
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <button
              className="menu-item"
              onClick={handleMyAccount}
            >
              My Account
            </button>
            <button
              className="menu-item"
              onClick={() => alert("Logout clicked")}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
