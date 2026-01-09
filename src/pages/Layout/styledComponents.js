import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  height: 100vh;
  margin: 0;
  border: 2px solid green;
`;

export const SideNavContainer = styled.div`
  width: 220px;
  height: 100vh;
  top: 0;
  left: 0;
  border: 1px solid green;
  box-sizing: border-box;
`;
export const ContentContainer = styled.div`
  flex: 1;
  height: 100vh;
`;
