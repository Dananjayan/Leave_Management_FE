import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PortalPage from "./components/PortalPage";
import DashboardPage from "./components/Dashboard"; // Ensure name consistency
import MyRecords from "./components/MyRecords";
import ApplicationList from "./components/ApplicationList"; // Import ApplicationList component
import Sidebar from "./components/Sidebar"; // Sidebar imported
import CreateLeaveForm from "./components/CreateLeaveForm"; // Import CreateLeaveForm component
import UpdateLeavePage from "./components/UpdateLeavePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar /> {/* Sidebar added */}
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/myrecords" element={<MyRecords />} /> {/* MyRecords route */}
            <Route path="/applicationlist" element={<ApplicationList />} /> {/* ApplicationList route */}
            <Route path="/createleave" element={<CreateLeaveForm />} /> {/* CreateLeaveForm route */}
            <Route path="/updateleave/:id" element={<UpdateLeavePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
