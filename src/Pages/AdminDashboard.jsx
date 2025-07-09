import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/customers/all");
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products/all");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/products/add/1`, newProduct); // Replace 1 with actual seller ID if needed
      setNewProduct({ name: "", description: "", price: "" });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {showForm ? "Cancel" : "Add Product"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-4 mb-6 rounded-lg shadow space-y-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Product
          </button>
        </form>
      )}

      {/* Customer List */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Customer List</h2>
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id}>
                <td className="p-2 border">{cust.name}</td>
                <td className="p-2 border">{cust.mobile}</td>
                <td className="p-2 border">₹{cust.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
