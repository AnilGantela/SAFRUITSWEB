import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import "reactjs-popup/dist/index.css";

import CityBox from "../../components/CityBox";
import {
  CitiesContainer,
  ProductsSideContainer,
  ProductsContentContainer,
} from "./styledComponents";

import ProductAddForm from "../../components/ProductAddForm";
import SubProductAddForm from "../../components/SubProductAddForm";
import axios from "axios";

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
  const [searchTerm, setSearchTerm] = useState(""); // <-- Search state

  const token = Cookies.get("saFruitsToken");
  const cityImages = [city1, city2, city3, city4, city5, city6];

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/products",
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
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
      fetchCategories(selectedProduct);
    } else {
      setCategories([]);
    }
  }, [selectedProduct]);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * cityImages.length);
    return cityImages[randomIndex];
  };

  const handleCityClick = (productName) => {
    if (productName === selectedProduct) {
      setIsOpen(false);
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct(productName);
    setIsOpen(true);
  };

  const closeSideBar = () => setIsOpen(false);

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CitiesContainer>
      <h1>Products</h1>

      {/* Search input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "5px 10px", width: "250px" }}
        />
      </div>

      {/* Add Product Button */}
      <Popup trigger={<button>Add Product</button>} modal nested>
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
            onClick={() => handleCityClick(product.productName)}
          />
        ))}
        {filteredProducts.length === 0 && <p>No products found</p>}
      </ProductsContentContainer>

      {/* Right Side Panel */}
      <ProductsSideContainer isOpen={isOpen}>
        <button onClick={closeSideBar}>Close</button>

        {selectedProduct && (
          <>
            <h2>{selectedProduct}</h2>

            {/* List categories */}
            {categories.map((cat, index) => (
              <p key={index}>{cat.categoryName}</p>
            ))}

            {/* Add Sub-Product */}
            <Popup trigger={<button>Add Sub-Product</button>} modal nested>
              {(close) => (
                <SubProductAddForm
                  onClose={close}
                  productName={selectedProduct}
                  onProductAdded={() => fetchCategories(selectedProduct)}
                />
              )}
            </Popup>
          </>
        )}
      </ProductsSideContainer>
    </CitiesContainer>
  );
};

export default Products;
