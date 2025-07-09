import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    quantity: 1,
    advance: 0,
    productId: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sorted);
        if (productId) {
          const prod = sorted.find((p) => p.id == productId);
          if (prod) {
            setProduct(prod);
            setFormData((prev) => ({ ...prev, productId: prod.id }));
          }
        }
      })
      .catch((err) => console.error("Error loading products", err));
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "advance" ? Number(value) : value,
    }));
  };

  const handleProductChange = (e) => {
    const selectedProduct = products.find((p) => p.id == e.target.value);
    setProduct(selectedProduct);
    setFormData({ ...formData, productId: selectedProduct.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = formData.quantity;
    const price = parseFloat(product.price);
    const advance = parseFloat(formData.advance);
    const total = quantity * price;
    const balance = total - advance;

    try {
      await axios.post("http://localhost:8080/api/orders/place", {
        ...formData,
        quantity,
        price,
        total,
        advance,
        balance,
      });

      setMessage("Order placed successfully!");
    } catch (err) {
      console.error("Failed to place order", err);
      setMessage("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          🛍️ Place Your Order
        </h2>

        {message && message.includes("successfully") && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-sm">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                ✅ Order Placed Successfully!
              </h2>
              <button
                onClick={() => navigate("/user-home")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Go to Home
              </button>
            </div>
          </div>
        )}

        {message && message.includes("Failed") && (
          <p className="text-center text-red-600 mb-4 font-semibold">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Dropdown */}
          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Product
            </label>
            <select
              name="productId"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              value={formData.productId}
              onChange={handleProductChange}
            >
              <option value="">Choose a product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter Name"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              required
              placeholder="Enter Phone Number"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              name="address"
              required
              rows={3}
              placeholder="Street, Landmark, Pincode"
              className="Enter Adress"
              onChange={handleChange}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              required
              value={formData.quantity}
              className="input-field"
              onChange={handleChange}
            />
          </div>

          {/* Advance */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Advance Amount
            </label>
            <input
              type="number"
              name="advance"
              min="0"
              required
              value={formData.advance}
              className="input-field"
              onChange={handleChange}
            />
          </div>

          {/* Totals */}
          <div className="col-span-2 bg-gray-50 border border-blue-100 rounded-lg p-4 mt-2">
            <p className="text-lg font-semibold text-gray-700">
              Total: ₹{" "}
              {product.price && formData.quantity
                ? formData.quantity * product.price
                : 0}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Balance: ₹{" "}
              {product.price && formData.advance
                ? formData.quantity * product.price - formData.advance
                : 0}
            </p>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
