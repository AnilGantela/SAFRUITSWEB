import styled from "styled-components";

export const CitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
  @media (max-width: 450px) {
    align-items: center;
  }
  h1 {
    display: block;
  }
`;

export const ProductsContentContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  gap: 15px;
  flex-wrap: wrap;
  height: 90%;
  box-sizing: border-box;
  @media (max-width: 450px;) {
    justify-content: center;
    align-items: center;
  }
`;

export const ProductsSideContainer = styled.div`
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background: #ffffff;
  transition: transform 0.3s ease-in-out;

  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};

  @media (max-width: 450px;) {
    width: 90%;
  }
`;
