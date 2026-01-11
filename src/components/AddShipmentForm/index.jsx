import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FormWrapper,
  Title,
  SmallInput,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  ButtonRow,
  DateContainer,
  ProductRow,
} from "./styledComponents";

const AddShipmentForm = ({ onClose, onShipmentAdded }) => {
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [useTransportCompany, setUseTransportCompany] = useState(false);

  const [productsData, setProductsData] = useState([]); // API response
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    transportCompany: "",
    city: "",
    shipmentDate: "",
    products: [
      { productName: "", categoryName: "", quantity: "", priceAtShipment: "" },
    ],
  });

  const token = Cookies.get("saFruitsToken");

  // Fetch products + categories once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-zmoa.onrender.com/products/allNamesAndCategories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductsData(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index][name] = value;

    // Reset category if product changes
    if (name === "productName") updatedProducts[index].categoryName = "";

    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          productName: "",
          categoryName: "",
          quantity: "",
          priceAtShipment: "",
        },
      ],
    }));
  };

  const removeProductRow = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      vehicleNumber: formData.vehicleNumber,
      city: formData.city,
      products: formData.products.map((p) => ({
        productName: p.productName,
        categoryName: p.categoryName || null,
        quantity: Number(p.quantity),
        priceAtShipment: Number(p.priceAtShipment),
      })),
    };

    if (useCustomDate && formData.shipmentDate) {
      payload.shipmentDate = new Date(formData.shipmentDate).toISOString();
    }

    if (useTransportCompany && formData.transportCompany) {
      payload.transportCompany = formData.transportCompany;
    }

    try {
      await axios.post(
        "https://backend-zmoa.onrender.com/shipments/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (onShipmentAdded) onShipmentAdded();
      onClose();
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("Failed to create shipment");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Add Shipment</Title>

      {/* Vehicle Number */}
      <SmallInput
        name="vehicleNumber"
        placeholder="Vehicle Number"
        value={formData.vehicleNumber}
        onChange={handleChange}
        required
      />

      {/* City */}
      <SmallInput
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />

      {/* Optional Transport Company */}
      {!useTransportCompany ? (
        <SecondaryButton
          type="button"
          onClick={() => setUseTransportCompany(true)}
        >
          Add Transport Company
        </SecondaryButton>
      ) : (
        <DateContainer>
          <SmallInput
            name="transportCompany"
            placeholder="Transport Company"
            value={formData.transportCompany}
            onChange={handleChange}
          />
          <DangerButton
            type="button"
            onClick={() => {
              setUseTransportCompany(false);
              setFormData((prev) => ({ ...prev, transportCompany: "" }));
            }}
          >
            Remove Transport Company
          </DangerButton>
        </DateContainer>
      )}

      {/* Products Rows */}
      {formData.products.map((product, index) => {
        const productObj = productsData.find(
          (p) => p.productName === product.productName
        );
        const categories = productObj ? productObj.categories : [];

        return (
          <ProductRow key={index}>
            {/* Product Dropdown */}
            <select
              name="productName"
              value={product.productName}
              onChange={(e) => handleProductChange(index, e)}
              required
            >
              <option value="">Select Product</option>
              {productsData.map((p) => (
                <option key={p.productName} value={p.productName}>
                  {p.productName}
                </option>
              ))}
            </select>

            {/* Category Dropdown */}
            <select
              name="categoryName"
              value={product.categoryName}
              onChange={(e) => handleProductChange(index, e)}
              disabled={categories.length === 0}
            >
              <option value="">Select Category (optional)</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Quantity */}
            <SmallInput
              type="number"
              name="quantity"
              min="1"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
              required
            />
            <SmallInput
              type="number"
              name="priceAtShipment"
              min="0"
              placeholder="Price at Shipment"
              value={product.priceAtShipment || ""}
              onChange={(e) => handleProductChange(index, e)}
              required
            />

            {/* Remove product button */}
            {index > 0 && (
              <DangerButton
                type="button"
                onClick={() => removeProductRow(index)}
              >
                Remove
              </DangerButton>
            )}
          </ProductRow>
        );
      })}

      <SecondaryButton type="button" onClick={addProductRow}>
        Add Product
      </SecondaryButton>

      {/* Optional Custom Date */}
      {!useCustomDate ? (
        <SecondaryButton type="button" onClick={() => setUseCustomDate(true)}>
          Add Custom Date
        </SecondaryButton>
      ) : (
        <DateContainer>
          <SmallInput
            type="datetime-local"
            name="shipmentDate"
            value={formData.shipmentDate}
            onChange={handleChange}
          />
          <DangerButton
            type="button"
            onClick={() => {
              setUseCustomDate(false);
              setFormData((prev) => ({ ...prev, shipmentDate: "" }));
            }}
          >
            Remove Date
          </DangerButton>
        </DateContainer>
      )}

      {/* Submit / Cancel */}
      <ButtonRow>
        <PrimaryButton type="submit">Create Shipment</PrimaryButton>
        <SecondaryButton type="button" onClick={onClose}>
          Cancel
        </SecondaryButton>
      </ButtonRow>
    </FormWrapper>
  );
};

export default AddShipmentForm;
