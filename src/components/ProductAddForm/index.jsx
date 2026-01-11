import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FormContainer,
  FormHeading,
  FormField,
  Label,
  Input,
  ButtonGroup,
  Button,
  LoadingIcon,
} from "./styledComponents";

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

      if (onProductAdded) onProductAdded();
      setProductName("");
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeading>Add Product</FormHeading>

      <FormField>
        <Label>Product Name</Label>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          disabled={loading}
        />
      </FormField>

      <ButtonGroup>
        <Button type="submit" disabled={loading}>
          {loading && <LoadingIcon />}
          {loading ? "Adding..." : "Add"}
        </Button>
        <Button type="button" cancel onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};

export default ProductAddForm;
