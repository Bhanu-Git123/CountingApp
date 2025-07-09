import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/customers/register",
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          paswword: formData.password, // use "paswword" as per your backend field
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/user/login"); // after registration, go to login
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          User Registration
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.name}
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
            type="email"
            name="email"
            placeholder="Email (Optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already registered?{" "}
          <span
            onClick={() => navigate("/user/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
