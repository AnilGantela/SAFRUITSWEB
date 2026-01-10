import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProductAddForm = ({ onClose, onProductAdded }) => {
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("saFruitsToken");
      await axios.post(
        "https://backend-zmoa.onrender.com/products/create",
        { productName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Product added:", productName);

      // Refresh parent product list
      if (onProductAdded) onProductAdded();

      setProductName(""); // reset form
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px" }}>
      <h3>Add Product</h3>

      <div>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
        <button type="button" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductAddForm;
