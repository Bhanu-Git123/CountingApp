import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/customers/login",
        {
          name,
          mobile,
        }
      );

      if (response.status === 200) {
        // You can store user info in localStorage if needed
        navigate("/user/home"); // Redirect to user dashboard
      }
    } catch (err) {
      setError("Invalid credentials or user not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          User Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/user/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
