import React, { useState, useEffect } from "react";

function UpdateProfile({ userEmail }) {
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail,
    mobile: "",
    password: "",
    balance: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/customers/email/${userEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || userEmail,
          mobile: data.mobile || "",
          password: "",
          balance: data.balance || 0,
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "balance" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/customers/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) alert("✅ Profile updated successfully!");
        else alert("❌ Update failed.");
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Update Profile
        </h2>

        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email (read-only)</label>
          <input
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Mobile</label>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Balance</label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-300"
        >
          💾 Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
