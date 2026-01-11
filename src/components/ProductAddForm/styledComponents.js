// styledComponents.js
import styled, { keyframes } from "styled-components";

// Form container
export const FormContainer = styled.form`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

// Form heading
export const FormHeading = styled.h3`
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
`;

// Form field wrapper
export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

// Label
export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

// Input
export const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:disabled {
    background-color: #f5f5f5;
  }
`;

// Buttons container
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media (max-width: 450px) {
    gap: 10px;
  }
`;

// Button
export const Button = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: ${({ cancel }) => (cancel ? "#aaa" : "#28a745")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${({ cancel }) => (cancel ? "#888" : "#218838")};
  }

  @media (max-width: 450px) {
    padding: 5px 8px;
  }
`;

// Loading spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Loading icon (can replace with your SVG)
export const LoadingIcon = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #28a745;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
`;
