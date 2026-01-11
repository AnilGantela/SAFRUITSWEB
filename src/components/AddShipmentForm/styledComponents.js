import styled from "styled-components";

// Wrapper for the entire form
export const FormWrapper = styled.form`
  width: 600px;
  max-width: 95%;
  margin: 20px auto;
  padding: 25px;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Form title
export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

// Generic input field
export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Smaller input for products
export const SmallInput = styled(Input)`
  width: 130px;
  margin-right: 10px;
`;

// Row for product inputs
export const ProductRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

// Button styles
export const PrimaryButton = styled.button`
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SecondaryButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  margin-top: 5px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const DangerButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-left: 5px;
  transition: all 0.2s;

  &:hover {
    background-color: #b02a37;
  }
`;

// Row for buttons
export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
`;

// Container for optional date or transport inputs
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
