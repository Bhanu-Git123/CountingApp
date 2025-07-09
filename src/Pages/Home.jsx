import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome</h1>
        <p className="text-gray-600 mb-8">Choose your login role</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/user/login")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login as User
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
