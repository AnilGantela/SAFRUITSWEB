import styled from "styled-components";

// Wrapper for the entire form
export const FormWrapper = styled.form`
  width: 100%; // increase from 100% to max 90% of screen
  max-width: 1200px;
  min-width: 70vw;
  background-color: #fefefe;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin-left: auto;
  padding: 6px;
  @media (max-width: 768px) {
    margin-left: -80px;
  }
  @media (max-width: 450px) {
    width: 100vw;
    flex-direction: column;
    margin-left: -80px;
  }
`;

export const FromBox = styled.div`
  max-width: 50%;
  flex: 2;
  display: flex;
  flex-direction: column;
  @media (max-width: 450px) {
    min-width: 100%;
    flex-direction: column;
    left: 0;
  }
`;

export const PreviewBox = styled.div`
  width: 50%;
  flex: 1;
  padding: 10px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  h3 {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    overflow-x: auto;
  }

  th,
  td {
    padding: 2px 3px;
    border: 1px solid #ccc;
  }

  th {
    background-color: #f0f0f0;
  }

  td button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 450px) {
    width: 100%;
    margin-top: 20px;

    th,
    td {
      padding: 2px 3px;
    }
  }
`;

export const FormContentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  * {
    box-sizing: border-box;
  }
`;

export const FormContentContainerFirstRow = styled.div`
  display: flex;
  width: 100%;
`;

export const FormContentContainerSecondRow = styled.div`
  display: flex;
  width: 100%;
`;

export const SecondRowContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  flex: 1;
  padding: 5px;
`;

// Label
export const InputLabel = styled.label`
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 0.9rem;
`;

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

// Container div

// Form title
export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

// Generic input field

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
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin: 2px;
  transition: all 0.2s;
  height: auto;

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
  align-items: stretch; /* Make children stretch to full height */
  gap: 5px;
  width: 100%;
`;
