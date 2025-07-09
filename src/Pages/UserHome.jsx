import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear auth data if any (tokens etc)
    navigate("/"); // Navigate to Landing Page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <nav className="w-64 bg-blue-900 text-white flex flex-col justify-center items-center py-12 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide mb-10">
          PR Distributions
        </h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-10 relative overflow-auto">
        {/* Top right dropdown button */}
        <div className="absolute top-6 right-6" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-controls="user-options-menu"
          >
            Options ▼
          </button>

          {menuOpen && (
            <div
              id="user-options-menu"
              role="menu"
              className="mt-2 w-44 bg-white shadow-lg rounded border border-gray-300"
            >
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/user/update-profile");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                Update Profile
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/user/place-order");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                Place Order
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Products Listing */}
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Available Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-600 text-lg">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-900">
                  {product.name}
                </h3>
                <p className="text-gray-700 mb-4 min-h-[3rem]">
                  {product.description}
                </p>
                <p className="font-semibold text-indigo-700 text-lg">
                  ₹ {product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
