import React from "react";
import { CityBoxContainer, CityImage, CityName } from "./styledComponents";

const CityBox = ({ cityName, onClick, cityImage }) => {
  return (
    <CityBoxContainer onClick={onClick}>
      <CityImage src={cityImage} alt={cityName} />
      <CityName>{cityName}</CityName>
    </CityBoxContainer>
  );
};

export default CityBox;
