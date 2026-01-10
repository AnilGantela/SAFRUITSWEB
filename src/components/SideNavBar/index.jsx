import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  SideNavBarContainer,
  NavItem,
  HamburgerButton,
  Overlay,
} from "./styledComponents";

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("saFruitsToken");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </HamburgerButton>

      {/* Overlay (Mobile Only) */}
      {isOpen && <Overlay onClick={closeMenu} />}

      {/* Sidebar */}
      <SideNavBarContainer isOpen={isOpen}>
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
        </ul>
      </SideNavBarContainer>
    </>
  );
};

export default SideNavBar;
