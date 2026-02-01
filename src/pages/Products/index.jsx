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
import city1 from "../../assets/fruit-icons/fruit1.svg";
import city2 from "../../assets/fruit-icons/fruit2.svg";
import city3 from "../../assets/fruit-icons/fruit3.svg";
import city4 from "../../assets/fruit-icons/fruit4.svg";
import city5 from "../../assets/fruit-icons/fruit5.svg";
import city6 from "../../assets/fruit-icons/fruit6.svg";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { state } = useAppContext();

  const token = Cookies.get("saFruitsToken");
  const cityImages = [city1, city2, city3, city4, city5, city6];

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/products",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setProducts(response.data);
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

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * cityImages.length);
    return cityImages[randomIndex];
  };

  const handleCityClick = (product) => {
    // If nothing is selected yet
    if (!selectedProduct) {
      setSelectedProduct(product);
      setIsOpen(true);
      return;
    }

    // If the clicked product is the currently selected one, close sidebar
    if (product.productName === selectedProduct.productName) {
      setIsOpen(false);
      setSelectedProduct(null);
      return;
    }

    // If a different product is clicked, select it
    setSelectedProduct(product);
    setIsOpen(true);
  };

  // Calculate displayed quantity for selectedProduct
  const getDisplayedQuantity = () => {
    if (!selectedProduct) return 0;

    if (selectedProduct.productQuantity > 0) {
      return selectedProduct.productQuantity;
    } else {
      // Sum all category quantities
      return categories.reduce(
        (total, cat) => total + (cat.categoryQuantity || 0),
        0,
      );
    }
  };

  const closeSideBar = () => setIsOpen(false);

  // Filter products by search term
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
        {filteredProducts.map((product, index) => (
          <CityBox
            key={product._id}
            cityName={product.productName}
            cityImage={getRandomImage()}
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
