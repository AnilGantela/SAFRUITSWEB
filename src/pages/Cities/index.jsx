import React, { useState } from "react";
import CityBox from "../../components/CityBox";
import { setCity } from "../../context/actions";
import { CitiesContainer } from "./styledComponents";
import { useAppContext } from "../../context/AppContext";

import city1 from "../../assets/city-icons/city1.svg";
import city2 from "../../assets/city-icons/city2.svg";
import city3 from "../../assets/city-icons/city3.svg";
import city4 from "../../assets/city-icons/city4.svg";
import city5 from "../../assets/city-icons/city5.svg";
import city6 from "../../assets/city-icons/city6.svg";
import city7 from "../../assets/city-icons/city7.svg";
import city8 from "../../assets/city-icons/city8.svg";

const Cities = () => {
  const { dispatch } = useAppContext();

  const [cities] = useState([
    "Tokyo",
    "Paris",
    "Sydney",
    "Vijayawada",
    "Guntur",
  ]);
  const [cityImages] = useState([
    city1,
    city2,
    city3,
    city4,
    city5,
    city6,
    city7,
    city8,
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * cityImages.length);
    return cityImages[randomIndex];
  };

  const handleCityClick = (cityName) => {
    setCity(dispatch, cityName);
  };

  // Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CitiesContainer>
      <h1>Cities</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px 12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "300px",
          display: "block",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {filteredCities.length > 0 ? (
          filteredCities.map((city, index) => (
            <CityBox
              key={index}
              cityName={city}
              cityImage={getRandomImage()}
              onClick={() => handleCityClick(city)}
            />
          ))
        ) : (
          <p>No cities found</p>
        )}
      </div>
    </CitiesContainer>
  );
};

export default Cities;
