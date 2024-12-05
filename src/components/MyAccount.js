import React, { useState } from "react";

const MyAccount = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility
  const [Profileinfo, setProfileinfo] = useState([]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Close dropdown when focus is lost
  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  // Note: Ensure you have the `axios` import and `emp_id` definition above this code for it to work.
  axios
    .post("http://localhost:4000/profileinfo", { emp_id })
    .then((response) => {
      if (response.data.success === true) {
        setProfileinfo(response.data.data || []);
      }
    })
    .catch((error) => setProfileinfo([]));

  return (
    <div className="my-account-container">
      <div className="main-content">
        <div className="user-info">
          {/* Dropdown trigger button */}
          <button
            className="user-button"
            onClick={toggleDropdown}
            onBlur={closeDropdown} // Close when focus is lost
          >
            vegeta
          </button>

          {/* Dropdown menu */}
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button className="dropdown-item">My Profile</button>
              <button className="dropdown-item logout-button">Logout</button>
            </div>
          )}
        </div>
        <div className="form-container">
          <form className="form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" defaultValue="prakash" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" defaultValue="s" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" defaultValue="prakash" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Leave blank if not changing"
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <input type="file" id="avatar" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
