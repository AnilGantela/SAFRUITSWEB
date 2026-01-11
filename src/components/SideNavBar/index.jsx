import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppContext } from "../../context/AppContext";
import { setCity } from "../../context/actions";

import {
  SideNavBarContainer,
  NavItem,
  HamburgerButton,
  BottomContainer,
  Overlay,
} from "./styledComponents";

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAppContext();
  const { state } = useAppContext();

  useEffect(() => {
    const token = Cookies.get("saFruitsToken");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const logout = () => {
    Cookies.remove("saFruitsToken");
    window.location.href = "/login"; // redirect after logout
  };

  const setCityNone = () => {
    setCity(dispatch, "none");
  };

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </HamburgerButton>

      {/* Overlay (Mobile Only) */}
      {isOpen && <Overlay onClick={closeMenu} />}

      {/* Sidebar */}
      <SideNavBarContainer $isOpen={isOpen} $backColor={state.colors.primary}>
        <ul>
          <NavItem onClick={closeMenu}>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem onClick={closeMenu}>
            <Link to="/products">Products</Link>
          </NavItem>
          <NavItem onClick={closeMenu}>
            <Link to="/orders">Orders</Link>
          </NavItem>
          <NavItem onClick={closeMenu}>
            <Link to="/customers">Customers</Link>
          </NavItem>
          <NavItem onClick={closeMenu}>
            <Link to="/cities">Cities</Link>
          </NavItem>
          <NavItem onClick={closeMenu}>
            <Link to="/shipments">Shipments</Link>
          </NavItem>
        </ul>

        <BottomContainer>
          <h1>{state.city}</h1>
          <button onClick={setCityNone}>Select All</button>
          <button onClick={logout}>Log Out</button>
        </BottomContainer>
      </SideNavBarContainer>
    </>
  );
};

export default SideNavBar;
