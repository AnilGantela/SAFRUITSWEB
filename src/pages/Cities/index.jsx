import React, { Component } from "react";
import CityBox from "../../components/CityBox";

// Import city images
import city1 from "../../assets/city-icons/city1.svg";
import city2 from "../../assets/city-icons/city2.svg";
import city3 from "../../assets/city-icons/city3.svg";
import city4 from "../../assets/city-icons/city4.svg";
import city5 from "../../assets/city-icons/city5.svg";
import city6 from "../../assets/city-icons/city6.svg";
import city7 from "../../assets/city-icons/city7.svg";
import city8 from "../../assets/city-icons/city8.svg";
import { CitiesContainer } from "./styledComponents";

class Cities extends Component {
  cities = ["Tokyo", "Paris", "Sydney", "New York", "London"];

  cityImages = [city1, city2, city3, city4, city5, city6, city7, city8];

  getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * this.cityImages.length);
    return this.cityImages[randomIndex];
  };

  handleCityClick = (cityName) => {
    console.log(`Clicked on ${cityName}`);
  };

  render() {
    return (
      <CitiesContainer>
        <h1>Cities</h1>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.cities.map((city, index) => (
            <CityBox
              key={index}
              cityName={city}
              cityImage={this.getRandomImage()}
              onClick={() => this.handleCityClick(city)}
            />
          ))}
        </div>
      </CitiesContainer>
    );
  }
}

export default Cities;
