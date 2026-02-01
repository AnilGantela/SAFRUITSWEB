import styled from "styled-components";

export const FormContainer = styled.form`
  position: relative;
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: ${({ $color }) => $color};
  }
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  margin-top: -10px;
  color: ${({ $color }) => $color};
`;

export const FormInputWrapper = styled.div`
  margin-bottom: 14px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${({ $color }) => $color};

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: ${({ $color }) => $color};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
