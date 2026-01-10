import styled from "styled-components";

export const CityBoxContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  height: 130px;
  width: 130px;
  cursor: pointer;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 468px) {
    height: 110px;
    width: 110px;
  }
`;
export const CityImage = styled.img`
  width: 80%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
`;
export const CityName = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;
