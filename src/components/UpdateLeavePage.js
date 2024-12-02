import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const UpdateLeavePage = () => {
  const navigate = useNavigate();
  const emp_id = localStorage.getItem("empid");
  const records_id = localStorage.getItem("recordsid");

  const [leave_type_id, setLeaveType] = useState("");
  const [day_type, setDayType] = useState("Whole Day");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [total_days, setDays] = useState(0);
  const [reasons, setReason] = useState("");
  const [leave_status, setLeaveStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  // Get today's date to set as the minimum allowed date
  const today = new Date().toISOString().split("T")[0];

  // Fetch existing data (if needed)
  useEffect(() => {
    axios
      .post("http://localhost:4000/updatefetch", { records_id })
      .then((response) => {
        if (response.data.success) {
          const data = response.data.user;

          // Populate form fields
          setLeaveType(data.leave_type_id);
          setDayType(data.day_type);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          setDays(data.total_days);
          setReason(data.reasons);
          setLeaveStatus(data.leave_status);
        }
      })
      .catch(() => alert("Failed to fetch record. Please try again later."))
      .finally(() => setIsLoading(false)); // Stop loading after fetch
  }, [records_id]);

  // Calculate total days automatically
  useEffect(() => {
    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      // Difference in days
      const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      setDays(diff >= 0 ? diff + 1 : 0); // Ensure positive number
    } else {
      setDays(0); // Reset if dates are empty
    }
  }, [start_date, end_date]);

  // Show loading spinner or message while data is being fetched
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSave = () => {
    if (!start_date || !end_date || !reasons) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    axios
      .post("http://localhost:4000/editrecords", {
        emp_id,
        leave_type_id,
        day_type,
        start_date,
        end_date,
        total_days,
        reasons,
        leave_status,
        records_id,
      })
      .then((response) => {
        if (response.data.success) {
          navigate("/applicationlist");
        }
      })
      .catch(() => alert("Failed to update record. Please try again later."));
  };

  const handleCancel = () => {
    setLeaveType("");
    setDayType("Whole Day");
    setStartDate("");
    setEndDate("");
    setDays(0);
    setReason("");
    navigate("/applicationlist");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="page-title">Update Leave</h2>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              name="leaveType"
              className="form-control"
              value={leave_type_id}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="1">EL</option>
              <option value="2">SL</option>
              <option value="3">VL</option>
              <option value="4">LWOP</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dayType">Day Type</label>
            <select
              id="dayType"
              name="dayType"
              className="form-control"
              value={day_type}
              onChange={(e) => setDayType(e.target.value)}
            >
              <option value="Whole Day">Whole Day</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              min={today} // Set today's date as the minimum date
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-control"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              min={today} // Set today's date as the minimum date
            />
          </div>

          <div className="form-group">
            <label htmlFor="days">Days</label>
            <input
              type="number"
              id="days"
              name="days"
              className="form-control"
              value={total_days}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              name="reason"
              className="form-control"
              value={reasons}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLeavePage;
