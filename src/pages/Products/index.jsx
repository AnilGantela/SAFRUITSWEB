import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import "reactjs-popup/dist/index.css";

import CityBox from "../../components/CityBox";
import {
  ProductsSideContainer,
  ProductsContentContainer,
  ProductsContainer,
  ProductsContainerHeaderContainer,
  AddProductButton,
  ProductsSearchInput,
} from "./styledComponents";

import ProductAddForm from "../../components/ProductAddForm";
import SubProductAddForm from "../../components/SubProductAddForm";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

// Import fruit images

import cherries from "../../assets/fruit-icons/cherries.jpg";
import orange from "../../assets/fruit-icons/orange.jpg";
import kiwi from "../../assets/fruit-icons/kiwi.jpg";
import apple from "../../assets/fruit-icons/apple.jpg";
import banana from "../../assets/fruit-icons/banana.png";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { state } = useAppContext();

  const token = Cookies.get("saFruitsToken");

  // Map productName to image
  const productImages = {
    APPLE: apple,
    CHERRIES: cherries,
    ORANGE: orange,
    KIWI: kiwi,
    BANANA: banana,
  };

  const getImageForProduct = (productName) => {
    // Return the mapped image or fallback to apple
    return productImages[productName] || apple;
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/products",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories for selected product
  const fetchCategories = async (productName) => {
    try {
      const response = await axios.get(
        `https://backend-zmoa.onrender.com/products/${productName}/categories`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch categories whenever selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      fetchCategories(selectedProduct.productName);
    } else {
      setCategories([]);
    }
  }, [selectedProduct]);

  const handleCityClick = (product) => {
    if (!selectedProduct) {
      setSelectedProduct(product);
      setIsOpen(true);
      return;
    }

    if (product.productName === selectedProduct.productName) {
      setIsOpen(false);
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct(product);
    setIsOpen(true);
  };

  const getDisplayedQuantity = () => {
    if (!selectedProduct) return 0;

    if (selectedProduct.productQuantity > 0) {
      return selectedProduct.productQuantity;
    } else {
      return categories.reduce(
        (total, cat) => total + (cat.categoryQuantity || 0),
        0,
      );
    }
  };

  const closeSideBar = () => setIsOpen(false);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ProductsContainer>
      <ProductsContainerHeaderContainer $color={state.colors.primary}>
        <h1>Products</h1>

        <ProductsSearchInput
          $backColor={state.colors.secondary}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          $borderColor={state.colors.primary}
        />
      </ProductsContainerHeaderContainer>

      {/* Add Product Button */}
      <Popup
        trigger={
          <AddProductButton $backColor={state.colors.secondary}>
            Add Product
          </AddProductButton>
        }
        modal
        nested
      >
        {(close) => (
          <ProductAddForm onClose={close} onProductAdded={fetchProducts} />
        )}
      </Popup>

      <ProductsContentContainer>
        {filteredProducts.map((product) => (
          <CityBox
            key={product._id}
            cityName={product.productName}
            cityImage={getImageForProduct(product.productName)}
            onClick={() => handleCityClick(product)}
          />
        ))}
        {filteredProducts.length === 0 && <p>No products found</p>}
      </ProductsContentContainer>

      {/* Right Side Panel */}
      <ProductsSideContainer
        $isOpen={isOpen}
        $backColor={state.colors.secondary}
      >
        <button onClick={closeSideBar}>Close</button>

        {selectedProduct && (
          <>
            <Popup trigger={<button>Add Sub-Product</button>} modal nested>
              {(close) => (
                <SubProductAddForm
                  onClose={close}
                  productName={selectedProduct}
                  onProductAdded={() => fetchCategories(selectedProduct)}
                />
              )}
            </Popup>

            <h2>{selectedProduct.productName}</h2>
            <p>Total Quantity: {getDisplayedQuantity()}</p>

            {/* Categories Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#eee" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ccc",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px",
                      border: "1px solid #ccc",
                    }}
                  >
                    Boxes
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr
                    key={index}
                    style={{ border: "1px solid #ccc", color: "#fff" }}
                  >
                    <td
                      style={{ padding: "8px", borderRight: "1px solid #ccc" }}
                    >
                      {cat.categoryName}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {cat.categoryQuantity || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </ProductsSideContainer>
    </ProductsContainer>
  );
};

export default Products;
