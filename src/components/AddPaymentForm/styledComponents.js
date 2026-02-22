// styledComponents.js
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
`;

export const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const Message = styled.p`
  margin-top: 1rem;
  color: ${(props) => (props.success ? "green" : "red")};
  text-align: center;
`;

export const CustomerBox = styled.div`
  background: #f1f5ff;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 8px;
  font-size: 14px;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

/* 🎨 Fade Animation */
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

export const PopupCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 380px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

/* 🔐 Loader Spinner */
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 0.7s linear infinite;
  margin: auto;
`;

/* 🧾 Printable Receipt */
export const ReceiptContainer = styled.div`
  display: none;

  @media print {
    display: block;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 300px;
    background: white;
  }
`;
