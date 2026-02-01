import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/AppContext";

import {
  FormContainer,
  FormTitle,
  FormInputWrapper,
  FormInput,
  ErrorText,
  SubmitButton,
  CloseIcon,
} from "./styledComponents";

const AddCustomerForm = ({ onClose, onCustomerAdded }) => {
  const [customerData, setCustomerData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    city: "",
  });
  const { state } = useAppContext();

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

      await axios.post(
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
      onCustomerAdded();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add customer";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseIcon onClick={onClose} $color={state.colors.primary}>
        <FiX size={22} />
      </CloseIcon>

      <FormTitle $color={state.colors.primary}>Add Customer</FormTitle>

      <FormInputWrapper>
        <FormInput
          type="text"
          name="customerName"
          placeholder="Name"
          value={customerData.customerName}
          onChange={handleChange}
          $color={state.colors.primary}
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
          $color={state.colors.primary}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormInputWrapper>

      <FormInputWrapper>
        <FormInput
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={customerData.phoneNumber}
          $color={state.colors.primary}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
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
          $color={state.colors.primary}
        />
        {errors.city && <ErrorText>{errors.city}</ErrorText>}
      </FormInputWrapper>

      <SubmitButton
        type="submit"
        disabled={loading}
        $color={state.colors.primary}
      >
        {loading ? "Adding..." : "Add Customer"}
      </SubmitButton>
    </FormContainer>
  );
};

export default AddCustomerForm;
