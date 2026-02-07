import styled from "styled-components";

export const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const FormContainer = styled.div`
  width: 60%;
  border: 2px solid red;
  text-align: left;
`;

export const ProductsContainer = styled.div`
  padding: 10px;
`;

export const FormHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  align-items: center;
`;

export const CustomerInfo = styled.div`
  background-color: #f1f1f1;
  padding: 5px;
  border-radius: 5px;
  width: 35%;
  p {
    margin: 5px 0;
  }
`;

export const BillContainer = styled.div`
  width: 39%;
  border: 2px solid green;
  text-align: center;
`;

export const OrderHeader = styled.h1`
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
  height: 50px;
`;

export const FormInput = styled.input`
  padding: 10px;
  min-width: 150px;
  flex: 1;
  max-width: 300px;
  height: 40px;
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
  height: 40px;
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

export const ShipmentSelect = styled.select`
  padding: 10px;
  min-width: 200px;
  height: 40px;
`;

export const OrderTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

export const OrderTH = styled.th`
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;
`;

export const OrderTD = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const QtyInput = styled.input`
  width: 70px;
  padding: 4px;
`;

export const RemoveBtn = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
`;
