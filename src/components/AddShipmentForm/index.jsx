import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

import {
  FormWrapper,
  Input,
  FromBox,
  PreviewBox,
  InputContainer,
  InputLabel,
  FormContentContainer,
  FormContentContainerFirstRow,
  FormContentContainerSecondRow,
  SecondRowContainer,
  SelectInput,
  ProductRow,
  DateContainer,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  ButtonRow,
} from "./styledComponents";

const AddShipmentForm = ({ onClose, onShipmentAdded }) => {
  const token = Cookies.get("saFruitsToken");

  const [useCustomDate, setUseCustomDate] = useState(false);
  const [useTransportCompany, setUseTransportCompany] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const [productsData, setProductsData] = useState([]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    categoryName: "",
    quantity: "",
    priceAtShipment: "",
  });

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    transportCompany: "",
    city: "",
    shipmentDate: "",
    products: [],
  });

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-zmoa.onrender.com/products/allNamesAndCategories",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setProductsData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, [token]);

  /* ---------------- VALIDATION ---------------- */
  const validateNewProduct = () => {
    const err = {};

    if (!newProduct.productName) err.productName = "Product is required";

    if (!newProduct.quantity || Number(newProduct.quantity) <= 0)
      err.quantity = "Quantity must be greater than 0";

    if (!newProduct.priceAtShipment || Number(newProduct.priceAtShipment) <= 0)
      err.priceAtShipment = "Price must be greater than 0";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateShipment = () => {
    const err = {};

    if (!formData.vehicleNumber)
      err.vehicleNumber = "Vehicle number is required";

    if (!formData.city) err.city = "City is required";

    if (formData.products.length < 1)
      err.products = "At least one product is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));

    if (name === "productName") {
      setNewProduct((p) => ({ ...p, categoryName: "" }));
    }
  };

  const addNewProductToList = () => {
    if (!validateNewProduct()) return;

    setFormData((p) => ({
      ...p,
      products: [...p.products, newProduct],
    }));

    setNewProduct({
      productName: "",
      categoryName: "",
      quantity: "",
      priceAtShipment: "",
    });

    setErrors({});
  };

  const removeProductRow = (index) => {
    setFormData((p) => ({
      ...p,
      products: p.products.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateShipment()) return;

    setIsSubmitting(true);

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
        },
      );

      toast.success("Shipment created successfully");

      if (onShipmentAdded) onShipmentAdded();

      setFormData({
        vehicleNumber: "",
        transportCompany: "",
        city: "",
        shipmentDate: "",
        products: [],
      });

      setNewProduct({
        productName: "",
        categoryName: "",
        quantity: "",
        priceAtShipment: "",
      });

      setUseCustomDate(false);
      setUseTransportCompany(false);
      setErrors({});
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create shipment");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <ToastContainer />
      <FromBox>
        <FormContentContainer>
          <FormContentContainerFirstRow>
            <InputContainer>
              <InputLabel>Vehicle Number :</InputLabel>
              <Input
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
              {errors.vehicleNumber && <small>{errors.vehicleNumber}</small>}
            </InputContainer>

            <InputContainer>
              <InputLabel>City :</InputLabel>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <small>{errors.city}</small>}
            </InputContainer>
          </FormContentContainerFirstRow>

          {/* TRANSPORT + DATE */}
          <FormContentContainerSecondRow>
            <SecondRowContainer>
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
                    <InputLabel>Transport Company :</InputLabel>
                    <Input
                      name="transportCompany"
                      value={formData.transportCompany}
                      onChange={handleChange}
                    />
                  </InputContainer>
                  <DangerButton
                    type="button"
                    onClick={() => {
                      setUseTransportCompany(false);
                      setFormData((p) => ({
                        ...p,
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
                    <InputLabel>Shipment Date :</InputLabel>
                    <Input
                      type="datetime-local"
                      name="shipmentDate"
                      value={formData.shipmentDate}
                      onChange={handleChange}
                    />
                  </InputContainer>
                  <DangerButton
                    type="button"
                    onClick={() => {
                      setUseCustomDate(false);
                      setFormData((p) => ({ ...p, shipmentDate: "" }));
                    }}
                  >
                    <FiTrash2 size={18} />
                  </DangerButton>
                </DateContainer>
              )}
            </SecondRowContainer>
          </FormContentContainerSecondRow>
        </FormContentContainer>

        {/* PRODUCT INPUT */}
        <ProductRow>
          <InputContainer>
            <InputLabel>Product :</InputLabel>
            <SelectInput
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
            </SelectInput>
            {errors.productName && <small>{errors.productName}</small>}
          </InputContainer>

          <InputContainer>
            <InputLabel>Category :</InputLabel>
            <SelectInput
              name="categoryName"
              value={newProduct.categoryName}
              onChange={handleNewProductChange}
              disabled={!newProduct.productName}
            >
              <option value="">Optional</option>
              {(
                productsData.find(
                  (p) => p.productName === newProduct.productName,
                )?.categories || []
              ).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectInput>
          </InputContainer>

          <InputContainer>
            <InputLabel>Quantity :</InputLabel>
            <Input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleNewProductChange}
            />
            {errors.quantity && <small>{errors.quantity}</small>}
          </InputContainer>

          <InputContainer>
            <InputLabel>Price :</InputLabel>
            <Input
              type="number"
              name="priceAtShipment"
              value={newProduct.priceAtShipment}
              onChange={handleNewProductChange}
            />
            {errors.priceAtShipment && <small>{errors.priceAtShipment}</small>}
          </InputContainer>

          <SecondaryButton type="button" onClick={addNewProductToList}>
            Add Product
          </SecondaryButton>
        </ProductRow>
      </FromBox>

      {/* PREVIEW */}
      <PreviewBox>
        <h3>Added Products</h3>
        {errors.products && <small>{errors.products}</small>}

        {formData.products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {formData.products.map((p, i) => (
                <tr key={i}>
                  <td>{p.productName}</td>
                  <td>{p.categoryName || "-"}</td>
                  <td>{p.quantity}</td>
                  <td>{p.priceAtShipment}</td>
                  <td>
                    <DangerButton
                      type="button"
                      onClick={() => removeProductRow(i)}
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
          <PrimaryButton
            type="submit"
            disabled={isSubmitting || formData.products.length < 1}
          >
            {isSubmitting ? "Creating..." : "Create Shipment"}
          </PrimaryButton>

          <SecondaryButton type="button" onClick={onClose}>
            Cancel
          </SecondaryButton>
        </ButtonRow>
      </PreviewBox>
    </FormWrapper>
  );
};

export default AddShipmentForm;
