import React from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardMain from "./components/core/dashboard/DashboardMain";
import QuickCreate from "./components/core/dashboard/QuickCreate";
import DailyReport from "./components/core/dashboard/DailyReport";
import LeaveRequest from "./components/core/dashboard/LeaveRequest";
import Team from "./components/core/dashboard/Team";
import Complaints from "./components/core/dashboard/Complaints";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./redux/slices/authSlice";
import ProtectedRoutes from "./components/core/auth/ProtectedRoutes";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess({ token }));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<DashboardMain />} />

          <Route path="quick-create" element={<QuickCreate />} />
          <Route path="daily-report" element={<DailyReport />} />
          <Route path="leave-request" element={<LeaveRequest />} />
          <Route path="team" element={<Team />} />
          <Route path="complaints-&-suggestions" element={<Complaints />} />
          <Route />
        </Route>
      </Routes>
      {/* <Dashboard /> */}
    </BrowserRouter>
  );
};

export default App;
