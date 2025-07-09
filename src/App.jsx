import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import UserLogin from "./Pages/UserLogin";
import UserRegister from "./Pages/UserRegister";
import AdminRegister from "./Pages/AdminRegister";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import UserHome from "./Pages/UserHome";
import PlaceOrder from "./Pages/PlaceOrder";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/place-order" element={<PlaceOrder />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
