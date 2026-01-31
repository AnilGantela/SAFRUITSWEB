import styled from "styled-components";

export const OrderContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

export const OrderHeader = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FormInput = styled.input`
  padding: 10px;
  flex: 1;
  min-width: 150px;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProductRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
`;

export const CustomerInfo = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  p {
    margin: 5px 0;
  }
`;

export const ShipmentSelect = styled.select`
  padding: 10px;
  min-width: 200px;
`;
