import styled from "styled-components";

export const FormContainer = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormTitle = styled.h3`
  margin: 0;
  text-align: center;
`;

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #2c7a7b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
