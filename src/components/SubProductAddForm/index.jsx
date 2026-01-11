import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FormContainer,
  FormHeading,
  FormField,
  Label,
  Input,
  ProductNameDisplay,
  ButtonGroup,
  Button,
  LoadingIcon,
} from "./styledComponents";

const SubProductAddForm = ({ onClose, productName, onProductAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("saFruitsToken");
      await axios.post(
        "https://backend-zmoa.onrender.com/products/category/create",
        { productName, categoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onProductAdded) onProductAdded();
      setCategoryName("");
      onClose();
    } catch (error) {
      console.error("Error adding sub-product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeading>Add SubProduct</FormHeading>

      <FormField>
        <Label>Product Name</Label>
        <ProductNameDisplay>{productName}</ProductNameDisplay>
      </FormField>

      <FormField>
        <Label>SubProduct Name</Label>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
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

export default SubProductAddForm;
