import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    secret: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const SECRET_CODE = "bhanu@admin123"; // ✅ only this code is valid

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.secret !== SECRET_CODE) {
      setError("Invalid secret code!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/admin/create-user", {
        username: formData.username,
        password: formData.secret,
        role: "ADMIN",
      });

      navigate("/admin/login");
    } catch (err) {
      setError("Admin already registered or server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Registration
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Admin Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="secret"
            placeholder="Secret Code"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.secret}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
