import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Visitors from "../pages/Visitors/Visitors";
import ActiveVisits from "../pages/ActiveVisits/ActiveVisits";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/active-visits" element={<ActiveVisits />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;