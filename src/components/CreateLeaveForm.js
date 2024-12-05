import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const CreateLeaveForm = () => {
  const emp_id = localStorage.getItem("empid");
  const [leave_type_id, setLeaveType] = useState("");
  const [day_type, setDayType] = useState("Whole Day");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [total_days, setDays] = useState(0);
  const [reasons, setReason] = useState("");
  const [leave_status, setLeaveStatus] = useState("pending");
  const [leave_option, setLeaveOption] = useState([]);
  const navigate = useNavigate();

  const calculateDays = () => {
    if (start_date && end_date) {
      const start = new Date(start_date);
      const end = new Date(end_date);
      const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setDays(difference > 0 ? difference : 0);
    }
  };

  const handleSave = () => {
    let active = "1";
    if (!start_date || !end_date || !reasons) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    axios
      .post("http://localhost:4000/newrecords", {
        emp_id,
        leave_type_id,
        day_type,
        start_date,
        end_date,
        total_days,
        reasons,
        leave_status,
        active,
      })
      .then((response) => {
        if (response.data.success) {
          navigate("/applicationlist");
        }
      })
      .catch(() => alert("Failed to save record. Please try again later."));
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/leaveoptions")
      .then((response) => {
        if (response.data.success) {
          setLeaveOption(response.data.leaveOptions);
        }
      })
      .catch((error) => {
        console.error("Error fetching leave options:", error);
      });
  }, []);

  const handleCancel = () => {
    setLeaveType("");
    setDayType("Whole Day");
    setStartDate("");
    setEndDate("");
    setDays(0);
    setReason("");
    navigate("/applicationlist");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container">
      <Sidebar />
      <div className="form-content">
        <h2>Create New Leave</h2>
        <form>
          <div className="form-group">
            <label>Leave Type</label>
            <select
              value={leave_type_id}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="" disabled>
                Please Select Leave Type
              </option>
              {leave_option.map((option) => (
                <option key={option.leave_type_id} value={option.leave_type_id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Day Type</label>
            <select
              value={day_type}
              onChange={(e) => setDayType(e.target.value)}
            >
              <option value="Whole Day">Whole Day</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date Start</label>
            <input
              type="date"
              value={start_date}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              onBlur={calculateDays}
            />
          </div>
          <div className="form-group">
            <label>Date End</label>
            <input
              type="date"
              value={end_date}
              min={start_date || today}
              onChange={(e) => setEndDate(e.target.value)}
              onBlur={calculateDays}
            />
          </div>
          <div className="form-group">
            <label>Days</label>
            <input type="number" value={total_days} readOnly />
          </div>
          <div className="form-group">
            <label>Reason</label>
            <textarea
              value={reasons}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason"
            ></textarea>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleSave}
              className="btn save-btn"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeaveForm;
