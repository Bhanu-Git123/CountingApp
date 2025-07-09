import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", secret: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/admin/login", {
        username: credentials.username,
        password: credentials.secret,
      });

      if (res.data === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        setError("You are not an admin!");
      }
    } catch (err) {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Admin Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="secret"
            placeholder="Secret Code"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={credentials.secret}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
