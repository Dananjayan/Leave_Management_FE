import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PortalPage from "./components/PortalPage";
import DashboardPage from "./components/Dashboard";
import MyRecords from "./components/MyRecords";
import ApplicationList from "./components/ApplicationList";
import Sidebar from "./components/Sidebar";
import CreateLeaveForm from "./components/CreateLeaveForm";
import UpdateLeavePage from "./components/UpdateLeavePage";
import MyAccount from "./components/MyAccount";
import "./App.css";

// A custom layout component to manage Sidebar visibility
const AppLayout = ({ children }) => {
  const location = useLocation();
  const pathsWithSidebar = ["/dashboard", "/myrecords", "/applicationlist", "/myaccount/:id"];

  // Check if the current path matches any route where the Sidebar should appear
  const showSidebar = pathsWithSidebar.some((path) => {
    const pathRegex = new RegExp(path.replace(":id", "\\d+")); // Replace dynamic params like :id with regex
    return pathRegex.test(location.pathname);
  });

  return (
    <div className="app">
      {showSidebar && <Sidebar />}
      <div className="content">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/myrecords" element={<MyRecords />} />
          <Route path="/applicationlist" element={<ApplicationList />} />
          <Route path="/createleave" element={<CreateLeaveForm />} />
          <Route path="/updateleave/:id" element={<UpdateLeavePage />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
