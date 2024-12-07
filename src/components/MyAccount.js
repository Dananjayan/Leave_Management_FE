import React, { useState, useEffect } from "react";
import axios from "axios";


const MyAccount = () => {
  const [profileInfo, setProfileInfo] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "", // Add password to manage it via state
  });

  const emp_id = localStorage.getItem("empid");
 

  useEffect(() => {
    axios
      .post("http://localhost:4000/myprofile", { emp_id })
      .then((response) => {
        if (response.data.success === true) {
          setProfileInfo({
            firstname: response.data.user.firstname || "",
            lastname: response.data.user.lastname || "",
            username: response.data.user.username || "",
          });
          console.log(response, "response");
          console.log(response.data, "response.data");
          console.log(response.data.user, "response.data.user");
        }
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [emp_id]);

  // Function to handle update
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission
    const { firstname, lastname, username, password } = profileInfo;

    axios
      .post("http://localhost:4000/updateinfo", {
        emp_id,
        firstname,
        lastname,
        username,
        password,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Record updated successfully!");
        }
      })
      .catch(() =>
        alert("Failed to update record. Please try again later.")
      );
  };

  return (
    <div className="my-account-container">
      <div className="main-content">
        <div className="form-container">
          <form className="form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={profileInfo.firstname}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, firstname: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={profileInfo.lastname}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, lastname: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={profileInfo.username}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, username: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Leave blank if not changing"
                value={profileInfo.password}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, password: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <input type="file" id="avatar" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
