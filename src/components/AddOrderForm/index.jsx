import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  OrderContainer,
  OrderHeader,
  Form,
  FormRow,
  FormInput,
  ProductContainer,
  Button,
  CustomerInfo,
  ShipmentSelect,
} from "./styledComponents"; // Adjust path

const CreateOrder = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [city, setCity] = useState("");
  const [cities] = useState([
    "Tokyo",
    "Paris",
    "Sydney",
    "Vijayawada",
    "Guntur",
  ]);

  const [products, setProducts] = useState([
    {
      productName: "",
      shipmentId: "",
      categoryName: "",
      quantity: 1,
      shipments: [],
      categories: [],
    },
  ]);

  const [addedProducts, setAddedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("saFruitsToken");

  // Fetch customer details by phone number
  useEffect(() => {
    const fetchCustomer = async () => {
      if (customerNumber.length === 10) {
        try {
          const res = await axios.get(
            `https://backend-zmoa.onrender.com/customers/phone/${customerNumber}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setCustomerDetails(res.data);
          if (res.data.city) setCity(res.data.city);
        } catch (error) {
          setCustomerDetails(null);
          toast.error("Customer not found");
        }
      } else {
        setCustomerDetails(null);
      }
    };
    fetchCustomer();
  }, [customerNumber, token]);

  // Handle product input change
  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    if (field === "productName" || field === "categoryName") {
      newProducts[index].shipmentId = "";
    }
    setProducts(newProducts);
  };

  // Search shipments for product
  const handleSearchShipments = async (index) => {
    const prod = products[index];
    const productName = prod.productName.trim();
    if (!productName) {
      toast.error("Enter product name first");
      return;
    }

    try {
      const res = await axios.get(
        `https://backend-zmoa.onrender.com/shipments/product/${productName}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const newProducts = [...products];
      const shipments = res.data.filter((s) =>
        s.products.some((p) => {
          const productMatch =
            p.productName.toLowerCase() === productName.toLowerCase();
          return productMatch && p.remainingQuantity > 0;
        }),
      );

      if (shipments.length === 0) {
        toast.error("No shipments found for this product");
        newProducts[index].shipments = [];
        newProducts[index].categories = [];
      } else {
        newProducts[index].shipments = shipments;

        const categoriesSet = new Set();
        shipments.forEach((s) =>
          s.products.forEach((p) => {
            const productMatch =
              p.productName.toLowerCase() === productName.toLowerCase();
            if (productMatch && p.remainingQuantity > 0 && p.categoryName) {
              categoriesSet.add(p.categoryName);
            }
          }),
        );
        newProducts[index].categories = Array.from(categoriesSet);

        // If only one shipment exists, preselect it
        if (shipments.length === 1) {
          newProducts[index].shipmentId = shipments[0]._id;
        }
      }

      setProducts(newProducts);
    } catch (error) {
      toast.error("Error fetching shipments");
    }
  };

  // Add product to table
  const handleAddProduct = (index) => {
    const prod = products[index];
    if (!prod.shipmentId) {
      toast.error("Select a shipment first");
      return;
    }

    const selectedShipment = prod.shipments.find(
      (s) => s._id === prod.shipmentId,
    );
    if (!selectedShipment) {
      toast.error("Invalid shipment selected");
      return;
    }

    const shipmentProduct = selectedShipment.products.find((p) => {
      const productMatch =
        p.productName.toLowerCase() === prod.productName.toLowerCase();
      const categoryMatch = prod.categoryName
        ? p.categoryName?.toLowerCase() === prod.categoryName.toLowerCase()
        : true; // no category selected
      return productMatch && categoryMatch;
    });

    if (!shipmentProduct) {
      toast.error("Invalid shipment selection");
      return;
    }

    if (prod.quantity > shipmentProduct.remainingQuantity) {
      toast.error(
        `Quantity cannot exceed remaining quantity (${shipmentProduct.remainingQuantity})`,
      );
      return;
    }

    setAddedProducts((prev) => [
      ...prev,
      {
        productName: prod.productName,
        categoryName: prod.categoryName,
        quantity: prod.quantity,
        shipmentId: prod.shipmentId,
        remainingQuantity: shipmentProduct.remainingQuantity,
      },
    ]);

    // Reset product row
    const newProducts = [...products];
    newProducts[index] = {
      productName: "",
      shipmentId: "",
      categoryName: "",
      quantity: 1,
      shipments: [],
      categories: [],
    };
    setProducts(newProducts);
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerNumber.trim() || customerNumber.length < 10) {
      toast.error("Customer phone number must be 10 digits");
      return;
    }

    if (!city.trim()) {
      toast.error("City is required");
      return;
    }

    if (!addedProducts.length) {
      toast.error("Add at least one product");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://backend-zmoa.onrender.com/orders/create",
        { customerNumber, city, products: addedProducts },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Order created successfully!");
      setCustomerNumber("");
      setCustomerDetails(null);
      setCity("");
      setProducts([
        {
          productName: "",
          shipmentId: "",
          categoryName: "",
          quantity: 1,
          shipments: [],
          categories: [],
        },
      ]);
      setAddedProducts([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContainer>
      <ToastContainer position="top-right" autoClose={3000} />
      <OrderHeader>Create Order</OrderHeader>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Customer Phone Number"
            value={customerNumber}
            onChange={(e) =>
              setCustomerNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            maxLength={10}
          />

          <FormInput
            as="select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </FormInput>
        </FormRow>

        {customerDetails && (
          <CustomerInfo>
            <p>Name: {customerDetails.customerName}</p>
            <p>Email: {customerDetails.email || "N/A"}</p>
            <p>Pending Amount: {customerDetails.pendingAmount || 0}</p>
          </CustomerInfo>
        )}

        <ProductContainer>
          {products.map((prod, index) => (
            <FormRow key={index}>
              <FormInput
                type="text"
                placeholder="Product Name"
                value={prod.productName}
                onChange={(e) =>
                  handleProductChange(index, "productName", e.target.value)
                }
              />
              <Button
                type="button"
                onClick={() => handleSearchShipments(index)}
              >
                Search
              </Button>

              {prod.categories.length > 0 && (
                <FormInput
                  as="select"
                  value={prod.categoryName}
                  onChange={(e) =>
                    handleProductChange(index, "categoryName", e.target.value)
                  }
                >
                  <option value="">Select Category</option>
                  {prod.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </FormInput>
              )}

              <ShipmentSelect
                value={prod.shipmentId}
                onChange={(e) =>
                  handleProductChange(index, "shipmentId", e.target.value)
                }
              >
                <option value="">Select Shipment</option>
                {prod.shipments
                  .filter((s) =>
                    s.products.some((p) => {
                      const productMatch =
                        p.productName.toLowerCase() ===
                        prod.productName.toLowerCase();
                      const categoryMatch = prod.categoryName
                        ? p.categoryName?.toLowerCase() ===
                          prod.categoryName.toLowerCase()
                        : true;
                      return (
                        productMatch && categoryMatch && p.remainingQuantity > 0
                      );
                    }),
                  )
                  .map((s) => {
                    const p = s.products.find((p) => {
                      const productMatch =
                        p.productName.toLowerCase() ===
                        prod.productName.toLowerCase();
                      const categoryMatch = prod.categoryName
                        ? p.categoryName?.toLowerCase() ===
                          prod.categoryName.toLowerCase()
                        : true;
                      return productMatch && categoryMatch;
                    });
                    if (!p) return null;
                    return (
                      <option
                        key={s._id}
                        value={s._id}
                        style={{
                          color: p.remainingQuantity < 5 ? "red" : "black",
                        }}
                      >
                        {s._id} - Remaining Qty: {p.remainingQuantity} -
                        Category: {p.categoryName || "N/A"}
                      </option>
                    );
                  })}
              </ShipmentSelect>

              <FormInput
                type="number"
                min={1}
                placeholder="Quantity"
                value={prod.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", Number(e.target.value))
                }
              />

              <Button type="button" onClick={() => handleAddProduct(index)}>
                Add to Order
              </Button>
            </FormRow>
          ))}
        </ProductContainer>

        {addedProducts.length > 0 && (
          <table border="1" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Shipment ID</th>
                <th>Remaining Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.productName}</td>
                  <td>{p.categoryName || "N/A"}</td>
                  <td>{p.quantity}</td>
                  <td>{p.shipmentId}</td>
                  <td
                    style={{
                      color: p.remainingQuantity < 5 ? "red" : "black",
                      fontWeight: p.remainingQuantity < 5 ? "bold" : "normal",
                    }}
                  >
                    {p.remainingQuantity}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        setAddedProducts((prev) =>
                          prev.filter((_, i) => i !== idx),
                        )
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating Order..." : "Create Order"}
        </Button>
      </Form>
    </OrderContainer>
  );
};

export default CreateOrder;
