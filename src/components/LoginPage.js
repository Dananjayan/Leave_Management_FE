import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePortalNavigation = () => {
    navigate("/portal");
  };

  const handleSignIn = () => {
    if (!username || !password) {
      alert("Please fill out both username and password!");
      return;
    }


    // Make a request for a user with a given ID
    axios.post('http://localhost:4000/login', { username, password })
      .then(function (response) {

        if (response.data.success === true) {
          localStorage.setItem('loginvalue', true)
          localStorage.setItem('empid', response.data.user.emp_id)


          navigate('/dashboard')
        }


        else
          console.log(response.data.message);


      })
  };

  return (
    <div className="login-section">
      <h1>Leave Management System</h1>
      <div className="login-wrapper">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="button-wrapper">
          <button className="login-button" onClick={handlePortalNavigation}>
            Go to Portal
          </button>
          <button className="signin-button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
