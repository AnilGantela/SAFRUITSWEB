import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SubProductAddForm = ({ onClose, productName, onProductAdded }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("saFruitsToken");
      await axios.post(
        "https://backend-zmoa.onrender.com/products/category/create",
        { productName, categoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Product added:", categoryName);

      // Refresh parent product list
      if (onProductAdded) onProductAdded();

      setCategoryName(""); // reset form
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px" }}>
      <h3>Add SubProduct</h3>

      <div>
        <label>Product Name</label>
        <h1>{productName}</h1>
      </div>

      <div>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubProductAddForm;
