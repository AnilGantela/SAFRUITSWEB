import styled from "styled-components";

export const ProductsContainer = styled.div`
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

export const ProductsContainerHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding-left: 40px;
  width: 100%;
  box-sizing: border-box;
  h1 {
    width: auto;
    font-size: clamp(14px, 6vw, 25px);
  }
  input {
    flex: 1;
    max-width: 200px;
    width: 50%;
    color: #e5383b;
  }
  @media (max-width: 468px) {
    gap: 10px;
  }
`;

export const AddProductButton = styled.button`
  background-color: ${({ $backColor }) => $backColor};
  margin: 20px;
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid white;
  cursor: pointer;
  @media (max-width: 450px) {
    self-align: flex-start;
  }
`;

export const ProductsSearchInput = styled.input`
  padding: 5px 10px;
  padding-inline-start: 20px;
  border: 2px solid ${({ $borderColor }) => $borderColor};
  border-top-left-radius: 25px;
  outline: none;

  &:focus {
    border-color: ${({ $borderColor }) => $borderColor};
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
  background-color: ${({ $backColor }) => $backColor};
  transition: transform 0.3s ease-in-out;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;

  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};

  @media (max-width: 450px) {
    width: 90%;
  }

  button {
    margin-bottom: 15px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #333;
    color: white;
    margin-left: 10px;

    &:hover {
      background-color: #555;
    }
  }

  h2 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: white;
  }

  p {
    margin: 5px 0;
    color: white;
  }
`;
