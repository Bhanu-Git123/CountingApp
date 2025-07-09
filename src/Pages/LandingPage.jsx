import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-12 drop-shadow-lg">
        Welcome! Please select your role:
      </h1>

      <div className="flex space-x-8">
        <button
          onClick={() => navigate("/admin/login")} // Correct path here
          className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 hover:text-white transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          aria-label="Admin Login"
        >
          Admin
        </button>

        <button
          onClick={() => navigate("/user/login")} // Correct path here
          className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 hover:text-white transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          aria-label="User Login"
        >
          User
        </button>
      </div>
    </div>
  );
}
