import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FiTrash2 } from "react-icons/fi";
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
  Input,
  FromBox,
  PreviewBox,
  InputContainer,
  InputLabel,
  FormContentContainer,
  FormContentContainerFirstRow,
  FormContentContainerSecondRow,
  SecondRowContainer,
} from "./styledComponents";

const AddShipmentForm = ({ onClose, onShipmentAdded }) => {
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [useTransportCompany, setUseTransportCompany] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    categoryName: "",
    quantity: "",
    priceAtShipment: "",
  });

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

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));

    // Reset category if product changes
    if (name === "productName")
      setNewProduct((prev) => ({ ...prev, categoryName: "" }));
  };

  const addNewProductToList = () => {
    if (
      !newProduct.productName ||
      !newProduct.quantity ||
      !newProduct.priceAtShipment
    ) {
      alert("Please fill all required fields");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));

    // Reset new product inputs
    setNewProduct({
      productName: "",
      categoryName: "",
      quantity: "",
      priceAtShipment: "",
    });
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
      <FromBox>
        <Title>Add Shipment</Title>
        <FormContentContainer>
          <FormContentContainerFirstRow>
            <InputContainer>
              <InputLabel htmlFor="vehicleNumber">Vehicle Number :</InputLabel>
              <Input
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required={true}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="city">City :</InputLabel>
              <Input
                id="city"
                name="city"
                placeholder="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </InputContainer>
          </FormContentContainerFirstRow>
          <FormContentContainerSecondRow>
            <SecondRowContainer>
              {" "}
              {!useTransportCompany ? (
                <SecondaryButton
                  type="button"
                  onClick={() => setUseTransportCompany(true)}
                >
                  Add Transport Company
                </SecondaryButton>
              ) : (
                <DateContainer>
                  <InputContainer>
                    <InputLabel htmlFor="transportCompany">
                      Transport Company :
                    </InputLabel>
                    <Input
                      id="transportCompany"
                      name="transportCompany"
                      placeholder="Transport Company"
                      value={formData.transportCompany}
                      onChange={handleChange}
                    />
                  </InputContainer>
                  <DangerButton
                    type="button"
                    onClick={() => {
                      setUseTransportCompany(false);
                      setFormData((prev) => ({
                        ...prev,
                        transportCompany: "",
                      }));
                    }}
                  >
                    <FiTrash2 size={18} />
                  </DangerButton>
                </DateContainer>
              )}
            </SecondRowContainer>
            <SecondRowContainer>
              {!useCustomDate ? (
                <SecondaryButton
                  type="button"
                  onClick={() => setUseCustomDate(true)}
                >
                  Add Custom Date
                </SecondaryButton>
              ) : (
                <DateContainer>
                  <InputContainer>
                    <InputLabel htmlFor="shipmentDate">
                      Shipment Date :
                    </InputLabel>
                    <Input
                      type="datetime-local"
                      id="shipmentDate"
                      name="shipmentDate"
                      placeholder="Transport Company"
                      value={formData.shipmentDate}
                      onChange={handleChange}
                    />
                  </InputContainer>

                  <DangerButton
                    type="button"
                    onClick={() => {
                      setUseCustomDate(false);
                      setFormData((prev) => ({ ...prev, shipmentDate: "" }));
                    }}
                  >
                    <FiTrash2 size={18} />
                  </DangerButton>
                </DateContainer>
              )}
            </SecondRowContainer>
          </FormContentContainerSecondRow>
        </FormContentContainer>

        {/* Optional Transport Company */}
        <ProductRow>
          <select
            name="productName"
            value={newProduct.productName}
            onChange={handleNewProductChange}
          >
            <option value="">Select Product</option>
            {productsData.map((p) => (
              <option key={p.productName} value={p.productName}>
                {p.productName}
              </option>
            ))}
          </select>

          <select
            name="categoryName"
            value={newProduct.categoryName}
            onChange={handleNewProductChange}
            disabled={
              !newProduct.productName ||
              !(
                productsData.find(
                  (p) => p.productName === newProduct.productName
                )?.categories.length > 0
              )
            }
          >
            <option value="">Select Category (optional)</option>
            {(
              productsData.find((p) => p.productName === newProduct.productName)
                ?.categories || []
            ).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <SmallInput
            type="number"
            name="quantity"
            placeholder="Quantity"
            min="1"
            value={newProduct.quantity}
            onChange={handleNewProductChange}
          />

          <SmallInput
            type="number"
            name="priceAtShipment"
            placeholder="Price at Shipment"
            min="0"
            value={newProduct.priceAtShipment}
            onChange={handleNewProductChange}
          />

          <SecondaryButton type="button" onClick={addNewProductToList}>
            Add Product
          </SecondaryButton>
        </ProductRow>
      </FromBox>

      <PreviewBox>
        <h3>Added Products</h3>
        {formData.products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {formData.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName || "-"}</td>
                  <td>{product.categoryName || "-"}</td>
                  <td>{product.quantity || "-"}</td>
                  <td>{product.priceAtShipment || "-"}</td>
                  <td>
                    <DangerButton
                      type="button"
                      onClick={() => removeProductRow(index)}
                    >
                      <FiTrash2 size={16} />
                    </DangerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ButtonRow>
          <PrimaryButton type="submit">Create Shipment</PrimaryButton>
          <SecondaryButton type="button" onClick={onClose}>
            Cancel
          </SecondaryButton>
        </ButtonRow>
      </PreviewBox>

      {/* Vehicle Number */}
    </FormWrapper>
  );
};

export default AddShipmentForm;
