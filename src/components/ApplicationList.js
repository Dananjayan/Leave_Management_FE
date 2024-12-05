import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Header from "./Header"; 

const ApplicationList = () => {
  const [recordsDetails, setRecordsDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [currentPage, setCurrentPage] = useState(1); // State to hold the current page for pagination
  const [entriesPerPage, setEntriesPerPage] = useState(10); // State to hold the number of entries per page
  const [selectedRecord, setSelectedRecord] = useState(null); // State for the selected record
  const emp_id = localStorage.getItem("empid");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:4000/applistsearch", { emp_id, searchQuery })
      .then((response) => {
        if (response.data.success === true) {
          setRecordsDetails(response.data.data || []);
        }
      })
      .catch(() => setRecordsDetails([]));
  }, [emp_id, searchQuery]);






  const handleAction = (id, action) => {
    console.log("Handling action:", action, "for record ID:", id); // Debugging
    if (action === "view") {
      const record = recordsDetails.find((item) => item.records_id === id);
      console.log("Selected record:", record); // Debugging
      if (record) {
        setSelectedRecord(record); // Set the selected record for the modal
      }
    } else if (action === "edit") {



      localStorage.setItem("recordsid", id)
      navigate(`/updateleave/${id}`);


      // Navigate to the update leave page with the record ID
    } else if (action === "delete") {
      const records = recordsDetails.find((item) => item.records_id === id);
      console.log(records.records_id,"records_id delete");
      
      axios
        .post("http://localhost:4000/remove_records", { records_id : records.records_id  })
        .then((response) => {
          if (response.data.success) {
            alert("Record deleted successfully!");
            axios
              .post("http://localhost:4000/applistsearch", { emp_id, searchQuery })
              .then((response) => {
                if (response.data.success === true) {
                  setRecordsDetails(response.data.data || []);
                }
              })
          }
        })
        .catch(() => alert("Failed to delete record. Please try again later."));
    }
  }


  const handleCloseModal = () => {
    setSelectedRecord(null); // Close the modal by clearing the selected record
  };

  const handleCreateNew = () => {
    navigate("/createleave");
  };

  const filteredRecords = recordsDetails.filter((record) => {
    const leaveTypeTerms = record.leave_type_terms || ""; // Default to an empty string if undefined or null
    return leaveTypeTerms.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Pagination Logic
  const indexOfLastRecord = currentPage * entriesPerPage;
  const indexOfFirstRecord = indexOfLastRecord - entriesPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when entries per page is changed
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Header/>
      <div className="main-content">
        
        <div className="application-list-container">
     
          <div className="application-header">
            <h2>List of Applications</h2>
            <button className="btn btn-primary" onClick={handleCreateNew}>
              + Create New
            </button>
          </div>

          <div className="application-table-container">
            <div className="table-controls">
              <label>
                Show
                <select className="entries-select" onChange={handleEntriesChange}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                entries
              </label>
              <input
                type="text"
                className="search-input"
                placeholder="Search by Leave Type"
                value={searchQuery} // Bind the input value to state
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
              />
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Leave Type</th>
                  <th>Total Days</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.leave_type_terms}</td>
                    <td>{record.total_days}</td>
                    <td>
                      <span
                        className={`badge ${record.leave_status === "Approved" ? "bg-success" : "bg-warning"
                          }`}
                      >
                        {record.leave_status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton-${index}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Action
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton-${index}`}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleAction(record.records_id, "view")}
                            >
                              <i className="bi bi-eye"></i> View
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleAction(record.records_id, "edit")}
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleAction(record.records_id, "delete")}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="pagination-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastRecord >= filteredRecords.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Viewing Record Details */}
        {selectedRecord && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h4>Leave Application Details</h4>
              <p>
                <strong>Leave Type:</strong> {selectedRecord.leave_type_terms}
              </p>
              <p>
                <strong>Total Days:</strong> {selectedRecord.total_days}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${selectedRecord.leave_status === "Approved"
                    ? "bg-success"
                    : "bg-warning"
                    }`}
                >
                  {selectedRecord.leave_status}
                </span>
              </p>
              {/* Additional Fields */}
              <p>
                <strong>Reasons:</strong> {selectedRecord.reasons}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedRecord.start_date}
              </p>
              <p>
                <strong>End Date:</strong> {selectedRecord.end_date}
              </p>
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
