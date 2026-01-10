import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
`;

export const SideNavContainer = styled.div`
  width: 220px;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 0px;
  }
`;
export const ContentContainer = styled.div`
  flex: 1;
  height: 100vh;
  box-sizing: border-box;
  padding: 10px;
`;
