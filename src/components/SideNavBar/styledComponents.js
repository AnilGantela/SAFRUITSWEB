import styled from "styled-components";

export const SideNavBarContainer = styled.nav`
  width: 220px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #9c0101;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }
`;

export const NavItem = styled.li`
  width: 100%;
  margin: 0;

  a {
    display: block;
    padding: 15px 20px;
    color: #fff;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.3s, color 0.3s;
  }

  a:hover {
    background-color: #7a0000;
    color: #fff;
  }

  @media (max-width: 768px) {
    a {
      padding: 10px;
      text-align: center;
    }
  }
`;
