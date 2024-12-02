import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";

const MyRecords = () => {
  const [employeeDetails, setEmployeeDetails] = useState('');
  const [leavecredit, setLeavecredit] = useState([]);
  const [RecordsDetails, setRecordsDetails] = useState([]);

  let emp_id = localStorage.getItem('empid');

  useEffect(() => {
    axios.post("http://localhost:4000/myprofile", { emp_id })
      .then(response => {
        if (response.data.success === true) {
          setEmployeeDetails(response.data.user);
        }
      })
      .catch(error => console.error("Error fetching employee details:", error));

    axios.post("http://localhost:4000/leavecredit")
      .then(response => {
        if (response.data.success === true) {
          setLeavecredit(response.data.data || []);
        }
      })
      .catch(error => setLeavecredit([]));


      
    axios.post("http://localhost:4000/records", { emp_id })
      .then(response => {
        if (response.data.success === true) {
          setRecordsDetails(response.data.data || []);
        }
      })
      .catch(error => setRecordsDetails([]));
  }, [emp_id]);





  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar included */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Leave Management System - Admin</h1>
          <div className="user-info">
            <span>vegeta</span>
            <button className="logout-button">Logout</button>
          </div>
        </div>
        <div className="my-records-container">
          <h2>My Records</h2>
          <div className="employee-details">
            <h4>Employee Details</h4>
            <p><strong>ID:</strong> {employeeDetails?.emp_id}</p>
            <p><strong>Name:</strong> {employeeDetails?.full_name}</p>
            <p><strong>DOB:</strong> {employeeDetails?.dob}</p>
            <p><strong>Address:</strong> {employeeDetails?.address}</p>
            <p><strong>Department:</strong> {employeeDetails?.department}</p>
            <p><strong>Designation:</strong> {employeeDetails?.designation}</p>
          </div>





          <div className="leave-records-row">
            <div className="leave-records-left">
              <h4>Leave Credits</h4>
              <table className="record-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Allowable</th>
                    <th>Available</th>
                  </tr>
                </thead>
                <tbody>
                  {leavecredit.map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.leave_type_terms}</td>
                      <td>0.0</td>
                      <td>0.0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>






            <div className="leave-records-right">
              <h4>Records</h4>
              <table className="record-table">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Date</th>
                    <th>Days</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {RecordsDetails.map((record, index) => (
                    <tr key={index}>
                      <td>{record.leave_type_name || record.leave_type_id}</td>
                      <td>{record.start_date || "N/A"}</td>
                      <td>{record.total_days || "N/A"}</td>
                      <td>{record.remarks || "No Remarks"}</td>
                    </tr>
                  ))}
                </tbody>





              </table>
            </div>
          </div>
        </div>
        <footer className="dashboard-footer">
          <h7>Copyright © 2024. All rights reserved. LMS (by: SBV Technologies) v1.0</h7>
        </footer>
      </div>
    </div>
  );
};

export default MyRecords;