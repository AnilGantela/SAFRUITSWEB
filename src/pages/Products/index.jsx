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

// Import fruit images
import city1 from "../../assets/fruit-icons/fruit1.svg";
import city2 from "../../assets/fruit-icons/fruit2.svg";
import city3 from "../../assets/fruit-icons/fruit3.svg";
import city4 from "../../assets/fruit-icons/fruit4.svg";
import city5 from "../../assets/fruit-icons/fruit5.svg";
import city6 from "../../assets/fruit-icons/fruit6.svg";
import SubProductAddForm from "../../components/SubProductAddForm";
import axios from "axios";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = Cookies.get("saFruitsToken");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  useEffect(() => {
    if (selectedProduct) {
      fetchCategories(selectedProduct);
    } else {
      setCategories([]); // reset categories if no product selected
    }
  }, [selectedProduct]);

  const cityImages = [city1, city2, city3, city4, city5, city6];

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
    console.log(selectedProduct);
    fetchCategories();
  };

  const closeSideBar = () => setIsOpen(false);

  return (
    <CitiesContainer>
      <h1>Products</h1>

      {/* Add Product Button */}
      <Popup trigger={<button>Add Product</button>} modal nested>
        {(close) => (
          <ProductAddForm onClose={close} onProductAdded={fetchProducts} />
        )}
      </Popup>

      <ProductsContentContainer>
        {products.map((city, index) => (
          <CityBox
            key={index}
            cityName={city.productName}
            cityImage={getRandomImage()}
            onClick={() => handleCityClick(city.productName)}
          />
        ))}
      </ProductsContentContainer>

      {/* Right Side Panel */}
      <ProductsSideContainer isOpen={isOpen}>
        <button onClick={closeSideBar}>Close</button>

        {selectedProduct && (
          <>
            <h2>{selectedProduct}</h2>
            {categories.map((city, index) => (
              <p>{city.categoryName}</p>
            ))}
            <Popup trigger={<button>Add Product</button>} modal nested>
              {(close) => (
                <SubProductAddForm
                  onClose={close}
                  productName={selectedProduct}
                  onProductAdded={fetchCategories}
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
