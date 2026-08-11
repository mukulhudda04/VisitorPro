import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Visitors from "../pages/Visitors/Visitors";
import Profile from "../pages/Profile/Profile";
import ActiveVisits from "../pages/ActiveVisits/ActiveVisits";
import CheckIn from "../pages/CheckIn/CheckIn";
import VisitHistory from "../pages/VisitHistory/VisitHistory";
import DashboardLayout from "../layouts/DashboardLayout";
import Users from "../pages/Users/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Layout */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/visitors"
          element={<Visitors />}
        />

        <Route
          path="/active-visits"
          element={<ActiveVisits />}
        />

        <Route
          path="/checkin"
          element={<CheckIn />}
        />

        <Route
          path="/visit-history"
          element={<VisitHistory />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;