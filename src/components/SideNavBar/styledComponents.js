import styled from "styled-components";

export const HamburgerButton = styled.button`
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const SideNavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background-color: ${({ $backColor }) => $backColor};
  padding-top: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  transition: transform 0.3s ease-in-out;

  /* Desktop */
  @media (min-width: 769px) {
    transform: translateX(0);
  }

  /* Mobile */
  @media (max-width: 768px) {
    z-index: 1000;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
  }

  ul {
    margin: 0px;
  }
`;

export const NavItem = styled.li`
  list-style: none;
  padding: 15px 20px;

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
  }

  a:hover {
    color: #38bdf8;
  }
`;

export const BottomContainer = styled.div`
  self-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  h1 {
    color: white;
    margin-bottom: 10px;
  }
  button {
    width: 90%;
    padding: 6px;
    margin-top: 10px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;
