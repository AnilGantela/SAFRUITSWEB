import styled from "styled-components";

export const CitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
  overflow-y: auto;

  @media (max-width: 450px;) {
    align-items: center;
  }
`;
