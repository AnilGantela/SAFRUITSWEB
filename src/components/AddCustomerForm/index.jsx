import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FormContainer,
  FormTitle,
  FormInputWrapper,
  FormInput,
  ErrorText,
  SubmitButton,
} from "./styledComponents"; // adjust path

const AddCustomerForm = ({ onClose, onCustomerAdded }) => {
  const [customerData, setCustomerData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!customerData.customerName.trim())
      newErrors.customerName = "Name is required";
    if (!customerData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(customerData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (customerData.email && !/\S+@\S+\.\S+/.test(customerData.email))
      newErrors.email = "Email is invalid";
    if (!customerData.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("saFruitsToken");
      const response = await axios.post(
        "https://backend-zmoa.onrender.com/customers/create",
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Customer added successfully!");
      onCustomerAdded(); // refresh list
      onClose(); // close popup
    } catch (error) {
      console.error("Error adding customer:", error);
      const msg = error.response?.data?.message || "Failed to add customer";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Add Customer</FormTitle>

      <FormInputWrapper>
        <FormInput
          type="text"
          name="customerName"
          placeholder="Name"
          value={customerData.customerName}
          onChange={handleChange}
        />
        {errors.customerName && <ErrorText>{errors.customerName}</ErrorText>}
      </FormInputWrapper>

      <FormInputWrapper>
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={customerData.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormInputWrapper>

      <FormInputWrapper>
        <FormInput
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={customerData.phoneNumber}
          onChange={(e) => {
            // Allow only digits
            const value = e.target.value.replace(/\D/g, "");
            // Limit to 10 digits
            if (value.length <= 10) {
              handleChange({ target: { name: "phoneNumber", value } });
            }
          }}
        />

        {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
      </FormInputWrapper>

      <FormInputWrapper>
        <FormInput
          type="text"
          name="city"
          placeholder="City"
          value={customerData.city}
          onChange={handleChange}
        />
        {errors.city && <ErrorText>{errors.city}</ErrorText>}
      </FormInputWrapper>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Customer"}
      </SubmitButton>
    </FormContainer>
  );
};

export default AddCustomerForm;
